import React, { useEffect, useState } from "react";
import "../assets/css/Hero.css";
import NavBar from "./NavBar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Button, ToastContainer } from "react-bootstrap";
import PendingCard from "./PendingCard";
import CompleteCard from "./CompleteCard";
import InProgress from "./InProgress";
import DeployedCard from "./DeployedCard";
import DefferedCard from "./DefferedCard";
import TaskModal from "../Modal/TaskModal";
import axios from "axios";
export const baseUrl = "https://task-manager-backend-yihs.onrender.com/api";

function Hero() {
  const [show, setShow] = useState(false);
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState("");

  function handleShow() {
    setShow(true);
  }

  
  function handleClose() {
    setShow(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(`${baseUrl}/tasks`, {})
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Filtering tasks based on filter options
  const filteredTasks = tasks.filter((task) => {
    // Filter by assignee name
    if (filterAssignee && task.assignee !== filterAssignee) {
      return false;
    }
    // Filter by priority
    if (filterPriority && task.priority !== filterPriority) {
      return false;
    }
    // Filter by date range
    if (filterStartDate && filterEndDate) {
      const taskDate = new Date(task.startDate);
      const startDate = new Date(filterStartDate);
      const endDate = new Date(filterEndDate);
      if (taskDate < startDate || taskDate > endDate) {
        return false;
      }
    }
    return true;
  });

  // Sorting tasks based on priority
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "priority") {
      return a.priority.localeCompare(b.priority);
    }
    // Add more sorting options as needed
    return 0;
  });

  return (
    <div style={{ padding: "5px" }}>
      <ToastContainer />
      <div>
        <NavBar />
      </div>
      <div className="main-Container">
        <div className="boxHeader">
          <div className="filterDiv">
            <h3>Filter By: </h3>

            <input
              type="text"
              placeholder="Assignee Name"
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <h4>Priority</h4>
              <select
                name="priority"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="">Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div className="dateInput">
              <lable> Start Time</lable>
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
              />
            </div>
            <div className="dateInput">
              <lable> End Time</lable>
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
              />
            </div>
            <div></div>
          </div>
          <div>
            <Button
              style={{ backgroundColor: "black", padding: "5px 70px 5px 70px" }}
              onClick={handleShow}
            >
              Add New Task
            </Button>
          </div>

          <TaskModal show={show} onHide={handleClose} />
        </div>

        <div style={{ marginTop: "15px" }} className="filterDiv">
          <h3>Sort By: </h3>

          <div style={{ display: "flex", gap: "10px" }}>
            <h4>Priority</h4>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="priority">Priority</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
          </div>
        </div>
        <div className="card-Container">
          <PendingCard tasks={sortedTasks} />
          <InProgress tasks={sortedTasks} />
          <CompleteCard tasks={sortedTasks} />
          <DeployedCard tasks={sortedTasks} />
          <DefferedCard tasks={sortedTasks} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
