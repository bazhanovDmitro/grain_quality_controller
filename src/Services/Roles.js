import axios from "axios";
import { ADD_TO_ROLE } from "../Constants/api_roots";

export const addRole = async (userID, roleID) => {
  axios
    .put(
      `${process.env.REACT_APP_API_ROOT}${ADD_TO_ROLE}?roleId=${roleID}&userId=${userID}`
    )
    .catch((error) => console.log(error));
};
