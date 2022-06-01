import axios from "axios";
import { GET_ALL_NOMRS } from "../Constants/api_roots";

export const getNorms = async () => {
  const normList = await axios.get(
    `${process.env.REACT_APP_API_ROOT}${GET_ALL_NOMRS}`
  );
  return normList.data;
};
