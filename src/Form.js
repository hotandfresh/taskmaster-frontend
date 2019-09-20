import React, { Fragment, useState } from "react";

function Form() {
  const API =
    // "http://taskmaster.6jwvzatvsi.us-west-2.elasticbeanstalk.com/api/v1/tasks/";
    "https://trjrww9576.execute-api.us-west-2.amazonaws.com/prod/tasks/";

  const [formData, setFormData] = useState({});

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

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default Form;
