import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const CreateItem = ({ data, handleClose, fetchItem, ...props }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    progress_percentage: "",
  });

  const onInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const { name, progress_percentage } = newItem;
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
        `https://todo-api-18-140-52-65.rakamin.com/todos/${data}/items`,
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
        <label>Task Name</label>
        <TextField
          type="text"
          placeholder="Type your Task"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
          required
        />

        <label>Progress</label>
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
            Save Task
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default CreateItem;
