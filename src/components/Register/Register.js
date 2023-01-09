import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./register.css";
import { TextField } from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let obj = {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      };
      if (password !== confirmPassword) {
        alert("Password Not Match");
      } else {
        axios
          .post("https://todo-api-18-140-52-65.rakamin.com/signup", obj)
          .then((resp) => {
            alert(resp.data.message);
            navigate("/");
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const card = (
    <CardContent variant="outlined" className={"box"}>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        Register
      </Typography>
      <Typography variant="h5">
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <TextField
              required
              id="confirm-password"
              name="confirm-password"
              label="Confirm Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br></br>
            <Typography variant="body2" component={"div"}>
              <div onClick={() => navigate(`/`)}>Sign In</div>
            </Typography>
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </form>
        </Box>
      </Typography>
    </CardContent>
  );

  return (
    <div className={"login"}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </div>
  );
};

export default Register;
