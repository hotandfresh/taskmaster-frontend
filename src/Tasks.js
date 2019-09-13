import React, { useState, useEffect, Component, Fragment } from "react";

const API =
  "http://taskmaster.6jwvzatvsi.us-west-2.elasticbeanstalk.com/api/v1/tasks";
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
