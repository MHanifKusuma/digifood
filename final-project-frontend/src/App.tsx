import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "pages/public";
import Login from "pages/public/Authentication/Login";
import Register from "pages/public/Authentication/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
