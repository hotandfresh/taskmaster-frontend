import React, { useState, useEffect, Fragment } from "react";
let form = new FormData();
const API =
  // "http://taskmaster.6jwvzatvsi.us-west-2.elasticbeanstalk.com/api/v1/tasks/";
  "https://trjrww9576.execute-api.us-west-2.amazonaws.com/prod/tasks/";

const APIWithResizedImg = "https://alltasksresized.s3-us-west-2.amazonaws.com/";
function Tasks() {
  useEffect(() => {
    fetchTasks();
  }, []);
  const [item, setItem] = useState([]);
  const [formData, setFormData] = useState({});

  const fetchTasks = async () => {
    const data = await fetch(API);

    const items = await data.json();
    setItem(items);
  };

  function _handleChangeForUpload(event) {
    let value = event.target.files ? event.target.files[0] : event.target.value;
    form.set(event.target.name, value);
  }

  function _handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  function _handleSubmit(event) {
    event.preventDefault();
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response.body));
  }

  function _upload(event) {
    event.preventDefault();
    fetch(API + event.target.id.value + "/images", {
      method: "POST",
      mode: "no-cors",
      body: form
    })
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
  }

  return (
    <Fragment>
      <div className="App">
        <h2>Add a Task</h2>
        <form onSubmit={_handleSubmit}>
          <label>
            <span>Title</span>
            <input
              onChange={_handleChange}
              name="title"
              type="text"
              placeholder="title"
              required
            />
          </label>
          <label>
            <span>Description</span>
            <input
              onChange={_handleChange}
              name="description"
              type="text"
              placeholder="description"
              required
            />
          </label>
          <label>
            <span>Assignee</span>
            <input
              onChange={_handleChange}
              name="assignee"
              type="text"
              placeholder="assignee"
            />
          </label>
          <button>Save</button>
        </form>

        <ul>
          {item.map((task, idx) => {
            return (
              <li key={task.id}>
                <details>
                  <summary>
                    <span>Task Name: {task.title}</span>
                  </summary>
                  <ol>
                    {task.pic ? (
                      <img
                        src={
                          (APIWithResizedImg + "resized-" + task.pic).slice(
                            0,
                            58
                          ) +
                          "-" +
                          (APIWithResizedImg + "resized-" + task.pic).slice(110)
                        }
                        alt={task.title}
                      ></img>
                    ) : (
                      <form
                        onSubmit={_upload}
                        action={API + task.id + "/images"}
                        method="POST"
                        encType="multipart/form-data"
                      >
                        <span>Upload Pic</span>
                        <input
                          onChange={_handleChangeForUpload}
                          name="file"
                          type="file"
                        />
                        <button name="id" value={task.id}>
                          Submit
                        </button>
                      </form>
                    )}
                    <li>Description: {task.description}</li>
                    <li>Assignee: {task.assignee}</li>
                    <li>History: </li>
                    {task.history.map((record, idx) => {
                      return (
                        <li key={idx}>
                          <span>{record.timestamp}</span>
                          <span> : </span>
                          <span>{record.action}</span>
                        </li>
                      );
                    })}
                  </ol>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
}

export default Tasks;
