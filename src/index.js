import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Assets/Styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ABOUT,
  ANALIZER,
  CHANGE_CREDENTIALS,
  EMPLOYEE_LIST,
  INITIAL,
  INITIAL_DEFAULT,
  NORMS,
  ORGANIZATION_LIST,
  REPORTS,
  REPORT_PREVIEW,
  RESTORE_PASSWORD,
} from "./Constants/links";
import LoginForm from "./Layouts/LoginForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={INITIAL} element={<App />}>
          <Route path={INITIAL_DEFAULT} element={<LoginForm />} />
          <Route path={ANALIZER} element={<div>ANALIZER</div>} />
          <Route path={REPORTS} element={<div>REPORTS</div>} />
          <Route path={REPORT_PREVIEW} element={<div>REPORT PREVIEW</div>} />

          <Route path={ABOUT} element={<div>ABOUT</div>} />
          <Route
            path={CHANGE_CREDENTIALS}
            element={<div>CHANGE CREDENTIALS</div>}
          />

          <Route path={EMPLOYEE_LIST} element={<div>EMPLOYEE LIST</div>} />
          <Route
            path={ORGANIZATION_LIST}
            element={<div>ORGANIZATION LIST</div>}
          />
          <Route path={NORMS} element={<div>NORM FORM</div>} />

          <Route path={RESTORE_PASSWORD} element={<div>RESTORE PAGE</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
