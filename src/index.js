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
  LOGOUT,
  NORMS,
  NORM_CONSTRUCTOR_CREATE,
  ORGANIZATION_LIST,
  REPORTS,
  REPORT_PREVIEW,
  RESTORE_PASSWORD,
  NORM_CONSTRUCTOR_UPDATE,
} from "./Constants/links";
import LoginForm from "./Layouts/LoginForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import { WORKER, MANAGER, ADMIN } from "./Constants/roles";
import About from "./Pages/About";
import ChangeCredentials from "./Pages/ChangeCredentials";
import Reports from "./Pages/Reports";
import EmployeeTablePage from "./Pages/EmployeeTablePage";
import Logout from "./Pages/Logout";
import OrganizationsTable from "./Pages/OrganizationsTable";
import Analizer from "./Pages/Analizer";
import Norms from "./Pages/Norms";
import NormConstructorCreate from "./Pages/NormConstructorCreate";
import NormConstructorUpdate from "./Pages/NormConstructorUpdate";

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
              <ProtectedRoute requiredRoles={WORKER} element={<Analizer />} />
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
                element={<OrganizationsTable />}
              />
            }
          />
          <Route
            path={NORMS}
            element={
              <ProtectedRoute requiredRoles={ADMIN} element={<Norms />} />
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
          <Route
            path={LOGOUT}
            element={
              <ProtectedRoute
                requiredRoles={[WORKER, MANAGER, ADMIN]}
                element={<Logout />}
              />
            }
          />
          <Route
            path={NORM_CONSTRUCTOR_CREATE}
            element={
              <ProtectedRoute
                requiredRoles={ADMIN}
                element={<NormConstructorCreate />}
              />
            }
          />
          <Route
            path={NORM_CONSTRUCTOR_UPDATE}
            element={
              <ProtectedRoute
                requiredRoles={ADMIN}
                element={<NormConstructorUpdate />}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
