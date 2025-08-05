import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: "Demo",
    completed: false,
    priority: 0,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTask(res.data.data))
      .catch((error) => console.log(error));
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:5000/api/v1/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate("/"))
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
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Enter The Task"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Check
          type="checkbox"
          label="Completed"
          checked={task.completed}
          onChange={(e) => setTask({ ...task, completed: e.target.checked })}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          aria-label="Select Priority"
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: parseInt(e.target.value) })
          }
        >
          <option value="" disabled hidden selected>
            Select Priority
          </option>
          <option value="1">Very Low</option>
          <option value="2">Low</option>
          <option value="3">Medium</option>
          <option value="4">High</option>
          <option value="5">Very High</option>
        </Form.Select>
      </Form.Group>
      <Button className="mt-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default EditTask;
