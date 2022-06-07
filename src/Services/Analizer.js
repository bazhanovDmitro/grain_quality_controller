import axios from "axios";
import {
  ANALIZE,
  CREATE_NORM,
  DELETE_NORM,
  GET_ALL_NOMRS,
  UPDATE_NORM,
} from "../Constants/api_roots";
import clearNormValues from "../Utils/clearNormValues";

export const getNorms = async () => {
  const normList = await axios.get(
    `${process.env.REACT_APP_API_ROOT}${GET_ALL_NOMRS}`
  );
  return clearNormValues(normList.data);
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

export const analize = async (
  userID,
  organizationID,
  values,
  cultureName,
  cultureID
) => {
  return axios.post(
    `${process.env.REACT_APP_API_ROOT}${ANALIZE}`,
    {
      id: cultureID,
      cultureName: cultureName,
      contractDefinedValues: {
        physicalWeight: 0,
        intakeMoistureIndexPercentage: 0,
        moistureDueToContract: 0,
        indicatorOfWeedImpurityPercentage: 0,
        indicatorOfWeedImpurityToTheContract: 0,
      },
      fieldToCheck: values,
    },
    {
      params: {
        userId: userID,
        organizationId: organizationID,
      },
    }
  );
};
