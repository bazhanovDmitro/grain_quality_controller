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
import ProtectedRoute from "./Components/ProtectedRoute";
import { WORKER, MANAGER, ADMIN } from "./Constants/roles";
import About from "./Pages/About";
import ChangeCredentials from "./Pages/ChangeCredentials";
import Reports from "./Pages/Reports";
import EmployeeTablePage from "./Pages/EmployeeTablePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={INITIAL} element={<App />}>
          <Route path={INITIAL_DEFAULT} element={<LoginForm />} />
          <Route
            path={ANALIZER}
            element={
              <ProtectedRoute
                requiredRoles={WORKER}
                element={<div>ANALIZER</div>}
              />
            }
          />
          <Route
            path={REPORTS}
            element={
              <ProtectedRoute
                requiredRoles={[WORKER, MANAGER]}
                element={<Reports />}
              />
            }
          />
          <Route
            path={REPORT_PREVIEW}
            element={
              <ProtectedRoute
                requiredRoles={[WORKER, MANAGER]}
                element={<div>REPORT PREVIEW</div>}
              />
            }
          />

          <Route
            path={ABOUT}
            element={
              <ProtectedRoute
                requiredRoles={[WORKER, MANAGER, ADMIN]}
                element={<About />}
              />
            }
          />
          <Route
            path={CHANGE_CREDENTIALS}
            element={
              <ProtectedRoute
                requiredRoles={[WORKER, MANAGER, ADMIN]}
                element={<ChangeCredentials />}
              />
            }
          />

          <Route
            path={EMPLOYEE_LIST}
            element={
              <ProtectedRoute
                requiredRoles={MANAGER}
                element={<EmployeeTablePage />}
              />
            }
          />
          <Route
            path={ORGANIZATION_LIST}
            element={
              <ProtectedRoute
                requiredRoles={ADMIN}
                element={<div>ORGANIZATION LIST</div>}
              />
            }
          />
          <Route
            path={NORMS}
            element={
              <ProtectedRoute
                requiredRoles={ADMIN}
                element={<div>NORM FORM</div>}
              />
            }
          />

          <Route
            path={RESTORE_PASSWORD}
            element={
              <ProtectedRoute
                requiredRoles={[WORKER, MANAGER, ADMIN]}
                element={<div>RESTORE PAGE</div>}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
