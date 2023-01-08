import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = axios
        .post(
          "https://todo-api-18-140-52-65.rakamin.com/auth/login",
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((resp) => {
          console.log(resp);
          const accessToken = resp.data.auth_token;
          sessionStorage.setItem("auth-token", accessToken);
          navigate("/todo");
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className={"title-roadmap"}>
        <h3>Product Roadmap</h3>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
