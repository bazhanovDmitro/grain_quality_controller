import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  ADD_TO_ORGANIZATION,
  DELETE_FROM_ORGANIZATION,
  GET_ORGANIZATION_WITH_USERS,
} from "../Constants/api_roots";
import { registerNewUser } from "./Auth";

export const addNewUserToOrganization = async (values, organizationID) => {
  const response = await registerNewUser(values);
  const newUserObject = jwtDecode(response);
  const newUserID = newUserObject.UserId;

  axios
    .put(
      `${process.env.REACT_APP_API_ROOT}${ADD_TO_ORGANIZATION}?id=${newUserID}&organizationId=${organizationID}`
    )
    .catch((error) => console.log(error));

  return newUserID;
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
