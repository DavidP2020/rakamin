import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./Todo.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateTodo from "./CreateTodo";
import Title from "../Model/TItle";
import Task from "../Model/Task";
import { Toolbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const accessToken = sessionStorage.getItem("auth-token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchTodo = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      let resTodo = await axios.get(
        "https://todo-api-18-140-52-65.rakamin.com/todos",
        config
      );
      setTodo(resTodo.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  // const handleDragEnd = ({ destination, source }) => {
  //   if (!destination) {
  //     return;
  //   }

  //   if (
  //     destination.index === source.index &&
  //     destination.droppableId === source.droppableId
  //   ) {
  //     return;
  //   }

  //   // Creating a copy of item before removing it from state
  //   const itemCopy = { ...todo[source.droppableId].items[source.index] };

  //   setTodo((prev) => {
  //     prev = { ...prev };
  //     // Remove from previous items array
  //     prev[source.droppableId].items.splice(source.index, 1);

  //     // Adding to new items array location
  //     prev[destination.droppableId].items.splice(
  //       destination.index,
  //       0,
  //       itemCopy
  //     );

  //     return prev;
  //   });
  // };

  return (
    <>
      <div>
        <div>
          <div className={"title"}>
            <Box sx={{ flexGrow: 1, borderBottom: 1 }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <b>Product Roadmap</b>
                </Typography>
                <Button variant="outlined" onClick={handleOpen}>
                  <i className="icon fa fa-plus-circle" aria-hidden="true"></i>
                  Add Todo
                </Button>
              </Toolbar>
            </Box>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Toolbar style={{ marginLeft: "-1rem" }}>
                  <Typography component="div" sx={{ flexGrow: 2 }}>
                    <b>Add Item</b>
                  </Typography>
                  <i
                    className="icon fa fa-times"
                    aria-hidden="true"
                    onClick={handleClose}
                  ></i>
                </Toolbar>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <CreateTodo handleClose={handleClose} />
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
      <div className="container">
        <DragDropContext>
          {todo.map((data, key) => {
            return (
              <div key={key} className={"column"}>
                <Title data={data} />
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        <Task data={data} />
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
};

export default Todo;
