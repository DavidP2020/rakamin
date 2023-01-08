import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import "./Todo.css";
import { v4 } from "uuid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import axios from "axios";

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
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const item = {
  id: v4(),
  name: "Hungry, what must i do ? eat or what ? i domt know i am hungry now",
  progress: 70,
};

const item2 = {
  id: v4(),
  name: "Hungrys",
  progress: 100,
};

const Todo = () => {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [itemList, setItemList] = useState([]);
  const accessToken = sessionStorage.getItem("auth-token");

  const fetchItem = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      let { data } = await axios.get(
        "https://todo-api-18-140-52-65.rakamin.com/todos/2/items",
        config
      );

      setItemList(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      let { data } = resTodo;
      let dataItem = fetchItem();
      // data.map((a) => {
      //   a.id = a.id;
      //   a.items = [];
      //   a.items.push({
      //     id: dataItem.id,
      //     title: dataItem.title,
      //   });
      // });
      setTodo(data);
    } catch (error) {
      console.log(error);
    }
  };
  {
    console.log(itemList);
  }
  useEffect(() => {
    fetchTodo();
    fetchItem();
  }, []);

  // {
  //   console.log("todo", todo);
  // }
  const [state, setState] = useState({
    task1: {
      title: "Group Task 1",
      month: "January - March",
      items: [item],
    },
    task2: {
      title: "Group Task 2",
      month: "April - June",
      items: [item2],
    },
    task3: {
      title: "Group Task 3",
      month: "July - September",
      items: [],
    },
    task4: {
      title: "Group Task 4",
      month: "October - Desember",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem2 = () => {
    setState((prev) => {
      return {
        ...prev,
        done: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text,
            },
            ...prev.done.items,
          ],
        },
      };
    });

    setText("");
  };
  return (
    <>
      <div className="container">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <div className={"title"}>
                  <div>
                    <span className={"title-text"}>{data.title}</span>
                  </div>
                  <div className={"title-month"}>
                    <b>{data.description}</b>
                    {console.log("dsadA", typeof data.items)}
                  </div>
                </div>
                {console.log("datra12", JSON.stringify(data))}
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <div key={el.id}>
                              <div>dsadsaads</div>
                              {el ? (
                                <Draggable index={index} draggableId={el.id}>
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className={`item ${
                                          snapshot.isDragging && "dragging"
                                        }`}
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
                                                value={el.progress}
                                                valueBuffer={0}
                                              />
                                            </Box>
                                            <div className={"progress"}>
                                              {/* {el.progress_percentage}% */}
                                              {el.progress === 100 ? (
                                                el.progress + "%  "
                                              ) : (
                                                <i
                                                  className="fa fa-check-circle"
                                                  aria-hidden="true"
                                                ></i>
                                              )}
                                            </div>
                                            <div className={"bar"}>
                                              <i
                                                className="fa fa-ellipsis-h"
                                                aria-hidden="true"
                                              ></i>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              ) : (
                                <div className="abcd">dsadsa</div>
                              )}
                            </div>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
                <div>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button onClick={addItem2}>Add</button>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
};

export default Todo;
