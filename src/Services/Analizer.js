import axios from "axios";
import {
  CREATE_NORM,
  DELETE_NORM,
  GET_ALL_NOMRS,
  UPDATE_NORM,
} from "../Constants/api_roots";

export const getNorms = async () => {
  const normList = await axios.get(
    `${process.env.REACT_APP_API_ROOT}${GET_ALL_NOMRS}`
  );
  return normList.data;
};

export const createNorm = async (name, fields) => {
  return axios.post(`${process.env.REACT_APP_API_ROOT}${CREATE_NORM}`, {
    id: 0,
    cultureName: name,
    fieldsToCheck: fields,
  });
};

export const deleteNorm = async (normId) => {
  return axios.delete(`${process.env.REACT_APP_API_ROOT}${DELETE_NORM}`, {
    params: {
      id: normId,
    },
  });
};

export const updateNorm = async (normId, name, newFields) => {
  return axios.put(
    `${process.env.REACT_APP_API_ROOT}${UPDATE_NORM}`,
    { id: normId, cultureName: name, fieldsToCheck: newFields },
    {
      params: {
        id: normId,
        cultureName: name,
        fieldsToCheck: newFields,
      },
    }
  );
};
