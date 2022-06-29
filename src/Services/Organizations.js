import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  ADD_TO_ORGANIZATION,
  CREATE_ORGANIZATION,
  DELETE_FROM_ORGANIZATION,
  DELETE_ORGANIZATION,
  GET_ALL_ORGANIZATIONS,
  GET_ORGANIZATION_WITH_USERS,
} from "../Constants/api_roots";
import { MANAGER_ROLE_ID, WORKER_ROLE_ID } from "../Constants/role_id";
import { registerNewUser } from "./Auth";
import { addRole } from "./Roles";

export const addNewUserToOrganization = async (
  values,
  organizationID,
  role = WORKER_ROLE_ID
) => {
  const response = await registerNewUser(values);
  const newUserObject = jwtDecode(response);
  const newUserID = newUserObject.UserId;

  await axios
    .put(
      `${process.env.REACT_APP_API_ROOT}${ADD_TO_ORGANIZATION}?id=${newUserID}&organizationId=${organizationID}`
    )
    .catch((error) => console.log(error));

  await addRole(newUserID, role).catch((error) => console.log(error));
  return {
    id: newUserID,
    lastName: values.lastName,
    firstName: values.firstName,
    email: values.email,
  };
};

export const deleteUserFromOrganization = async (userID, organizationID) => {
  return axios
    .put(
      `${process.env.REACT_APP_API_ROOT}${DELETE_FROM_ORGANIZATION}?id=${userID}&organizationId=${organizationID}`
    )
    .catch((error) => console.log(error));
};

export const getOrganizationWithUsers = async (organizationID) => {
  return axios
    .get(`${process.env.REACT_APP_API_ROOT}${GET_ORGANIZATION_WITH_USERS}`, {
      params: { organizationId: organizationID },
    })
    .then((response) => {
      return response.data.users.map((user) => {
        return {
          lastName: user.lastName,
          firstName: user.firstName,
          email: user.email,
          id: user.id,
        };
      });
    });
};

export const getOrganizationList = async () => {
  return axios
    .get(`${process.env.REACT_APP_API_ROOT}${GET_ALL_ORGANIZATIONS}`)
    .then((response) => {
      return response.data.map((organization) => {
        return {
          id: organization.id,
          organizationName: organization.organizationName,
        };
      });
    });
};

export const createOrganizationWithManager = async ({
  organizationName,
  managerName,
  managerLastName,
  managerEmail,
  managerPassword,
}) => {
  const organizationID = 0; // Zero is triggering auto increment on backend side

  await axios.post(`${process.env.REACT_APP_API_ROOT}${CREATE_ORGANIZATION}`, {
    id: organizationID,
    organizationName: organizationName,
  });
  const organizationList = await getOrganizationList();
  const lastCreated = organizationList[organizationList.length - 1].id;
  await addNewUserToOrganization(
    {
      firstName: managerName,
      lastName: managerLastName,
      email: managerEmail,
      password: managerPassword,
    },
    lastCreated,
    MANAGER_ROLE_ID
  );

  return {
    id: lastCreated,
    organizationName: organizationName,
  };
};

export const deleteOrganization = async (organizationObject) => {
  return axios
    .delete(`${process.env.REACT_APP_API_ROOT}${DELETE_ORGANIZATION}`, {
      params: {
        organizationId: organizationObject.id,
      },
    })
    .catch((error) => console.log(error));
};
