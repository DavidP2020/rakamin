import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./login.css";
import { TextField } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "https://todo-api-18-140-52-65.rakamin.com/auth/login",
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((resp) => {
          if (resp.status) {
            alert("Success Login");
            const accessToken = resp.data.auth_token;
            sessionStorage.setItem("auth-token", accessToken);
            navigate("/todo");
          } else {
            alert("Please Try Again}");
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  const card = (
    <CardContent variant="outlined" className={"box"}>
      <Typography variant="h4" color="text.secondary" gutterBottom>
        Login
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
            <Typography variant="body2" component={"div"}>
              <div onClick={() => navigate(`/register`)}>Sign Up</div>
            </Typography>
            <Button variant="contained" type="submit">
              Login
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

export default Login;
