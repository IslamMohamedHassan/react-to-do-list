import React, { useEffect, useState } from "react";

export default function ToDoList() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Retrieve tasks from local storage on component mount
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks state changes
    if (tasks.length !== 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // handle input changes
  function handleOnChange(event) {
    setNewTask(event.target.value);
  }

  // Function to generate a unique ID for tasks
  function generateId() {
    
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  // handle add new task
  function handleAddTask() {
    if (!!newTask) {
      const newTaskItem = { id: generateId(), task: newTask, completed: false };
      setTasks([...tasks, newTaskItem]);
    }
    setNewTask("");
  }

  // handle delete task
  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // handle mark task
  function handleMark(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <>
      <div className="container">
        <h1>To Do List</h1>
        <div className="to-do-list">
          <input
            className="input-field"
            type="text"
            onChange={handleOnChange}
            value={newTask}
          />
          <button className="add-button" onClick={handleAddTask}>
            Add
          </button>

          <table className="task-table">
            <thead>
              <tr>
                <th>Mark</th>
                <th>Task</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <input
                      className="checkbox"
                      onChange={() => handleMark(task.id)}
                      type="checkbox"
                      checked={task.completed}
                    />
                  </td>
                  <td
                    className="task-text"
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.task}
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}





