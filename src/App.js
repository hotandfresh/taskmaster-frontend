import React, { useState, useEffect } from "react";
import "./app.scss";
// http://taskmaster-dev.us-east-1.elasticbeanstalk.com/api/v1
// http://taskmaster-env.3nz9fretef.us-west-2.elasticbeanstalk.com/

const API = "http://taskmaster-dev.us-east-1.elasticbeanstalk.com/api/v1/tasks";

function App() {
  fetch(API)
    .then(data => data.json())
    .then(fetchTasks => setTasks(fetchTasks));
  const [tasks, setTasks] = useState([]);

  useEffect(_getTasks, []);

  function _getTasks() {
    console.log("getting tasks");
  }

  return (
    <div className="App">
      <ul>
        {tasks.map((task, idx) => {
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
  );
}

export default App;
