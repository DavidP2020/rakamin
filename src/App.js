import { Routes } from "react-router";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import "./App.css";
import Todo from "./components/Todo/Todo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
