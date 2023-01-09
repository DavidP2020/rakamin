import { Box, Popover, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateItem from "../Todo/CreateItem";
import DeleteItem from "../Todo/DeleteItem";
import EditItem from "../Todo/EditItem";

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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  marginTop: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "green" : "grey",
  },
}));

const Task = ({ data, ...props }) => {
  const [itemList, setItemList] = useState([]);
  const accessToken = sessionStorage.getItem("auth-token");
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //Pop
  const handleClickPop = (event, id) => {
    event.preventDefault();
    setId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;

  //Item
  const handleOpenItem = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleCloseItem = () => setOpen(false);

  //Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //Edit
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const fetchItem = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      let res = await axios.get(
        `https://todo-api-18-140-52-65.rakamin.com/todos/${data.id}/items`,
        config
      );
      setItemList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div>
      {itemList.length ? (
        <div>
          {itemList.map((el, index) => {
            return (
              <div key={el.id}>
                <Draggable index={index} draggableId={el.id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className={`item ${snapshot.isDragging && "dragging"}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {el.name}
                        <div className={"wrap"}>
                          <div className={"flex a-center"}>
                            <Box sx={{ width: "100%" }}>
                              <BorderLinearProgress
                                variant="buffer"
                                value={el.progress_percentage}
                                valueBuffer={0}
                              />
                            </Box>
                            <div className={"progress"}>
                              {el?.progress_percentage !== 100 ? (
                                el.progress_percentage + "%  "
                              ) : (
                                <i
                                  className="icon-green fa fa-check-circle"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </div>
                            <div className={"bar"}>
                              <button
                                className="btnElipsis"
                                onClick={(e) => handleClickPop(e, el)}
                              >
                                <i
                                  className="icon-elip fa fa-ellipsis-h"
                                  aria-hidden="true"
                                ></i>
                              </button>

                              <Popover
                                id={idPop}
                                open={openPop}
                                anchorEl={anchorEl}
                                onClose={handleClosePop}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                              >
                                <Typography sx={{ p: 2 }}>
                                  <div>
                                    <Button>
                                      <i
                                        className="icon fa fa-arrow-right"
                                        aria-hidden="true"
                                      ></i>
                                      Move Right
                                    </Button>
                                  </div>
                                  <div>
                                    <Button>
                                      <i
                                        className="icon fa fa-arrow-left"
                                        aria-hidden="true"
                                      ></i>
                                      Move Left
                                    </Button>
                                  </div>
                                  <div>
                                    <Button onClick={handleOpenEdit}>
                                      <i
                                        className="icon fa fa-pencil"
                                        aria-hidden="true"
                                      ></i>
                                      Edit
                                    </Button>
                                    <Modal
                                      aria-labelledby="transition-modal-title"
                                      aria-describedby="transition-modal-description"
                                      open={openEdit}
                                      onClose={handleCloseEdit}
                                      closeAfterTransition
                                      BackdropProps={{
                                        timeout: 500,
                                      }}
                                    >
                                      <Fade in={openEdit}>
                                        <Box sx={style}>
                                          <Toolbar
                                            style={{ marginLeft: "-1rem" }}
                                          >
                                            <Typography
                                              component="div"
                                              sx={{ flexGrow: 2 }}
                                            >
                                              <b>Edit Task</b>
                                            </Typography>
                                            <i
                                              className="icon fa fa-times"
                                              aria-hidden="true"
                                              onClick={handleCloseEdit}
                                            ></i>
                                          </Toolbar>
                                          <Typography
                                            id="transition-modal-description"
                                            sx={{ mt: 2 }}
                                          >
                                            <EditItem
                                              todo={data.id}
                                              data={id}
                                              handleClose={handleCloseEdit}
                                              fetchItem={fetchItem}
                                            />
                                          </Typography>
                                        </Box>
                                      </Fade>
                                    </Modal>
                                  </div>

                                  <div>
                                    <Button onClick={handleOpenDelete}>
                                      <i
                                        className="icon fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
                                      Delete
                                    </Button>
                                    <Modal
                                      aria-labelledby="transition-modal-title"
                                      aria-describedby="transition-modal-description"
                                      open={openDelete}
                                      onClose={handleCloseDelete}
                                      closeAfterTransition
                                      BackdropProps={{
                                        timeout: 500,
                                      }}
                                    >
                                      <Fade in={openDelete}>
                                        <Box sx={style}>
                                          <Toolbar
                                            style={{ marginLeft: "-2rem" }}
                                          >
                                            <Typography
                                              component="div"
                                              sx={{ flexGrow: 2 }}
                                            >
                                              <i
                                                className="icon fa fa-exclamation-triangle"
                                                aria-hidden="true"
                                                style={{ color: "red" }}
                                              ></i>
                                              <b>Delete Task</b>
                                            </Typography>
                                            <i
                                              className="icon fa fa-times"
                                              aria-hidden="true"
                                              onClick={handleCloseDelete}
                                            ></i>
                                          </Toolbar>
                                          <Typography
                                            id="transition-modal-description"
                                            sx={{ mt: 2 }}
                                          >
                                            <DeleteItem
                                              todo={data.id}
                                              data={id}
                                              handleClose={handleCloseDelete}
                                              fetchItem={fetchItem}
                                            />
                                          </Typography>
                                        </Box>
                                      </Fade>
                                    </Modal>
                                  </div>
                                </Typography>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <Draggable>
            {(provided, snapshot) => {
              return (
                <div
                  className={`item ${snapshot.isDragging && "dragging"}`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  No Task
                </div>
              );
            }}
          </Draggable>
        </div>
      )}
      <div>
        <Button onClick={() => handleOpenItem(data.id)}>
          <i className="icon fa fa-plus-circle" aria-hidden="true"></i>
          Add Item
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleCloseItem}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style}>
              <Toolbar style={{ marginLeft: "-1rem" }}>
                <Typography component="div" sx={{ flexGrow: 2 }}>
                  <b>Create Task</b>
                </Typography>
                <i
                  className="icon fa fa-times"
                  aria-hidden="true"
                  onClick={handleCloseItem}
                ></i>
              </Toolbar>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2 }}
                component={"div"}
              >
                <CreateItem
                  data={id}
                  handleClose={handleCloseItem}
                  fetchItem={fetchItem}
                />
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Task;
