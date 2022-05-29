import axios from "axios";
import { LOGIN_URL } from "../Constants/api_roots";
import jwtDecode from "jwt-decode";
import { USER_TOKEN } from "../Constants/localStorage";

export const checkIfLogged = () => {
  const userToken = localStorage.getItem(USER_TOKEN);
  if (userToken) {
    return jwtDecode(userToken);
  }
  return false;
};

export const login = async ({ email, password }) => {
  // If not make a request
  return axios
    .post(`${process.env.REACT_APP_API_ROOT}${LOGIN_URL}`, {
      email: email,
      password: password,
    })
    .then((response) => {
      localStorage.setItem(USER_TOKEN, response.data.token);
      return jwtDecode(response.data.token);
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
