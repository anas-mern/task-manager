import axios from "axios";
import { useContext, useEffect } from "react";
import TaskCard from "./TaskCard";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TaskContext } from "../context/TasksContext";

function TaskContainer() {
  const { tasks, setTasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data.data));
  }, [token,setTasks]);

  const onEdit = (id) => {
    navigate(`/${id}`);
  };
  const onDel = (id) => {
    axios
      .delete(`http://localhost:5000/api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setTasks(tasks.filter((t) => t._id !== id)));
  };
  const onChecked = (id) => {
    const theTask = tasks.filter((t) => t._id === id);
    axios
      .patch(`http://localhost:5000/api/v1/tasks/${id}`, {
        completed: !theTask.completed,
      } , {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() =>
        setTasks((prev) =>
          prev.map((task) =>
            task._id === id ? { ...task, completed: true } : task
          )
        )
      );
  };
  const onSort = (key) => {
    setTasks((prev) =>
      [...prev].sort((a, b) => {
        if (key === "priority") {
          return b.priority - a.priority;
        } else if (key === "createdAt") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
      })
    );
  };
  console.log(tasks);
  return (
    <div className="card-container m-auto mt-3 w-50">
      <Button onClick={() => onSort("priority")}>Sort By Priority</Button>
      <Button onClick={() => onSort("createdAt")}>Sort By Created Date</Button>
      {tasks.map((t) => (
        <TaskCard
          key={t._id}
          id={t._id}
          {...t}
          onEdit={onEdit}
          onDel={onDel}
          onChecked={onChecked}
        />
      ))}
    </div>
  );
}

export default TaskContainer;
