import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";

const DeleteItem = ({ data, handleClose, fetchItem, todo, ...props }) => {
  const accessToken = sessionStorage.getItem("auth-token");
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.delete(
        `https://todo-api-18-140-52-65.rakamin.com/todos/${todo}/items/${data.id}`,
        config
      );
      handleClose();
      fetchItem();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "36ch" },
        }}
        component={"div"}
      >
        Are you sure want to delete this task ? your action can't be reverted
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
            style={{ background: "red" }}
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default DeleteItem;
