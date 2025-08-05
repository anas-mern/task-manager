import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { TaskContext } from "../context/TasksContext";
function AddTask() {
  const [task, setTask] = useState({ title: "", priority: "" });
  const { setTasks } = useContext(TaskContext);
  const token = localStorage.getItem('token')
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/tasks", task, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks((prev) => [...(prev || []), res.data.data]))
      .catch((err) => console.log(err));
  };
  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-dark w-50 m-auto p-3 text-white form-box"
    >
      <h1>Task Manager</h1>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Enter The Task"
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          required
          value={task.priority}
          aria-label="Select Priority"
          onChange={(e) =>
            setTask({ ...task, priority: parseInt(e.target.value) })
          }
        >
          <option value="">Select Priority</option>
          <option value="1">Very Low</option>
          <option value="2">Low</option>
          <option value="3">Medium</option>
          <option value="4">High</option>
          <option value="5">Very High</option>
        </Form.Select>
      </Form.Group>
      <Button className="mt-3" type="submit">
        Add
      </Button>
    </Form>
  );
}

export default AddTask;
