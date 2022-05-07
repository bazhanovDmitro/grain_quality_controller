import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Assets/Styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ABOUT, INITIAL, INITIAL_DEFAULT } from "./Constants/links";
import LoginForm from "./Layouts/LoginForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={INITIAL} element={<App />}>
          <Route path={INITIAL_DEFAULT} element={<LoginForm />} />
          <Route path={ABOUT} element={<div>ABOUT</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
