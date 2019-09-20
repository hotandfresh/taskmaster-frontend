import React, { useState, useEffect, Fragment } from "react";

function Assignee() {
  const API =
    // "http://taskmaster.6jwvzatvsi.us-west-2.elasticbeanstalk.com/api/v1/tasks/";
    "https://trjrww9576.execute-api.us-west-2.amazonaws.com/prod/tasks/";

  useEffect(() => {
    fetchTasks();
  }, []);
  const [item, setItem] = useState([]);

  const fetchTasks = async () => {
    const data = await fetch(API);

    const items = await data.json();
    setItem(items);
  };

  return (
    <Fragment>
      {item.map((task, id) => {
        return (
          <li key={task.id}>
            <ol>
              {task.assignee != null ? (
                <p>This task doesn't have an assignee</p>
              ) : (
                <a>
                  <p>{task.assignee}</p>
                </a>
              )}
            </ol>
          </li>
        );
      })}
    </Fragment>
  );
}

export default Assignee;
