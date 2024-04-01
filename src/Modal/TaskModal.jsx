import React, { useEffect, useState } from "react";
import { Button, Dropdown, FloatingLabel, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "../assets/css/Hero.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/Task.css";
import { baseUrl } from "../Components/Hero";

function TaskModal({ show, onHide, handleClose, task, getList }) {
  // const [selectedPriority, setSelectedPriority] = useState("P0");
  // const [selectedStatus, setSelectedStatus] = useState("Completed");
  // const navigate = useNavigate();
  // const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    team: "",
    assignee: "",
    priority: "P0",
    status: "Completed",
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    
    if (task) {
      axios
        .put(`${baseUrl}/tasks/edit/${formData._id}`, formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          onHide();
          getList();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(`${baseUrl}/createTask`, formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          toast.success("Task Created Successfully");
          onHide();
          setFormData({});
          getList();
        })
        .catch((err) => {
          toast.error("Task not Created");

          console.log(err);
        });
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setFormData({});
        handleClose();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {task ? "Edit Task" : "Create Task"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#b985b9" }}>
        <form onSubmit={handleSubmit}>
          <input
            className="inputTag"
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <textarea
            className="inputTag"
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <input
            className="inputTag"
            type="text"
            placeholder="Team"
            name="team"
            value={formData.team}
            onChange={handleInputChange}
          />

          <input
            required
            className="inputTag"
            type="text"
            placeholder="Assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleInputChange}
          />
          <div className="boxHeader">
            <div>
              <h4>Priority</h4>
              <Form.Select
                name="priority"
                onChange={handleInputChange}
                defaultValue={formData.priority}
              >
                <option>P0</option>
                <option>P1</option>
                <option>P2</option>
              </Form.Select>
            </div>
            <div>
              <h4>Status</h4>
              <Form.Select
                name="status"
                onChange={handleInputChange}
                defaultValue={formData.status}
              >
                <option>Completed</option>
                <option>Pending</option>
                <option>Deployed</option>
                <option>Deferred</option>
                <option>In Progress</option>
              </Form.Select>
            </div>
          </div>
          <Button type="submit">{task ? "Update" : "Create"}</Button>
          <Button type="reset">Reset</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={onHide}>
          close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModal;
