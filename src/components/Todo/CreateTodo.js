import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const CreateTodo = ({ handleClose, ...props }) => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  const onInputChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const { title, description } = newTodo;
  const accessToken = sessionStorage.getItem("auth-token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post(
        "https://todo-api-18-140-52-65.rakamin.com/todos",
        newTodo,
        config
      );
      //   handleClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "36ch" },
      }}
      component={"div"}
    >
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <TextField
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => onInputChange(e)}
          required
        />

        <label>Description</label>
        <TextField
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => onInputChange(e)}
          required
        />
        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              margin: "5px",
              color: "black",
              border: "1px solid",
              borderRadius: "5px",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{ background: "green" }}
            variant="contained"
            type="submit"
          >
            Save Task
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default CreateTodo;
