import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../assets/css/Card.css";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import TaskModal from "../Modal/TaskModal";
import DeleteModal from "../Modal/DeleteModal";
import { baseUrl } from "./Hero";

function InProgress() {
  const [cardContent, setCardContent] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  function handleClose() {
    setShow(false);
  }

  function handleDeleteClose(){
    setShowDeleteModal(false)
  }

  function handleEdit(task) {
    setSelectedTask(task);
    setShow(true);
  }

  function handleDelete(task) {
    setSelectedTask(task);
    setShowDeleteModal(true);
  }

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios
      .get(`${baseUrl}/tasks`, {})
      .then((res) => {
        console.log(res.data.status);
        if (res.data && res.data.length > 0) {
          // Filter out only pending tasks
          const inProgressTasks = res.data.filter(
            (task) => task.status == "In Progress"
          );
          setTimeout(() => {
            if (inProgressTasks != undefined && inProgressTasks.length > 0) {
              console.log("_____aya ", [...inProgressTasks]);
              setCardContent(inProgressTasks);
            }
            console.log("_____end ", inProgressTasks);
          }, 0);
        }
      })
      .catch((err) => {
        // toast.error("Task not Created");

        console.log(err);
      });
  };


  return (
    <div>
      <Card className="outer-card">
        <Card.Header
          style={{
            backgroundColor: "#FFAF45",
            zIndex: "1",
            fontSize: "1.25rem",
            color: "white",
          }}
        >
          In Progress
        </Card.Header>
        <Card.Body style={{ overflow: "scroll" }}>
          {cardContent &&
            cardContent.map((card, index) => (
              <div style={{ gap: "20px" }}>
                <Card className="inner-card" key={index}>
                  <Card.Header>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "30px",
                      }}
                    >
                      <h6 style={{ marginTop: "5px" }}>Task {index + 1}</h6>
                      <button
                        style={{
                          border: "2px solid #ccc",
                          backgroundColor: "blue",
                          width: "fit-content",
                          padding: "0px 3px",
                        }}
                      >
                        {card.priority}
                      </button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{card.title}</Card.Text>
                    <Card.Title>{card.description}</Card.Title>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button variant="primary">In Progress</Button>
                      <span>
                        {["start"].map((direction, idx) => (
                          <DropdownButton
                            // style={{visibility:"hidden"}}
                            variant=""
                            key={idx}
                            drop={direction}
                            title={<FaEllipsisV />}
                          >
                            <Dropdown.Item
                              onClick={() => {
                                handleEdit(card);
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => {handleDelete(card)}}
                              style={{ color: "red" }}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        ))}
                      </span>

                      <DeleteModal
                        showDeleteModal={showDeleteModal}
                        onHide={handleDeleteClose}
                        task={selectedTask}
                        getList={getList}
                      />

                      <TaskModal
                        show={show}
                        onHide={handleClose}
                        task={selectedTask}
                        getList={getList}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          {/* {!cardContent?.length && (<h1>hi</h1>)} */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default InProgress;
