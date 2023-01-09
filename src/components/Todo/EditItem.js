import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const EditItem = ({ data, handleClose, fetchItem, todo, ...props }) => {
  const [newItem, setNewItem] = useState({
    target_todo_id: data.todo_id,
    name: data.name,
    progress_percentage: data.progress_percentage,
  });

  const onInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const { target_todo_id, name, progress_percentage } = newItem;
  const accessToken = sessionStorage.getItem("auth-token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.put(
        `https://todo-api-18-140-52-65.rakamin.com/todos/${todo}/items/${data.id}`,
        newItem,
        config
      );
      fetchItem();
      handleClose();
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
        <label>
          <b>Task Name</b>
        </label>
        <TextField
          type="text"
          placeholder="Type your Task"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
          required
        />

        <label>
          <b>Progress</b>
        </label>
        <TextField
          type="number"
          placeholder="70"
          name="progress_percentage"
          value={progress_percentage}
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
            Save Change
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EditItem;
