import React, { useState, useEffect, Fragment } from "react";
let form = new FormData();
const API =
  // "http://taskmaster.6jwvzatvsi.us-west-2.elasticbeanstalk.com/api/v1/tasks";
  "http://localhost:5000/api/v1/tasks/";
function Tasks() {
  useEffect(() => {
    fetchTasks();
  }, []);
  const [item, setItem] = useState([]);

  const fetchTasks = async () => {
    const data = await fetch(API);

    const items = await data.json();
    setItem(items);
  };

  function _handleChange(event) {
    let value = event.target.files ? event.target.files[0] : event.target.value;
    form.set(event.target.name, value);
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
        <ul>
          {item.map((task, idx) => {
            return (
              <li key={task.id}>
                <details>
                  <summary>
                    <span>{task.title}</span>
                  </summary>
                  <ol>
                    <form
                      onSubmit={_upload}
                      action={API + task.id + "/images"}
                      method="POST"
                      encType="multipart/form-data"
                    >
                      <span>Upload Pic</span>
                      <input onChange={_handleChange} name="file" type="file" />
                      <button name="id" value={task.id}>
                        Submit
                      </button>
                    </form>
                    {task.history.map((record, idx) => {
                      return (
                        <li key={idx}>
                          <span>{record.timestamp}</span>
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
