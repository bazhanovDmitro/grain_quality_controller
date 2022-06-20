import axios from "axios";
import {
  ANALIZE,
  CREATE_NORM,
  DELETE_NORM,
  GET_ALL_NOMRS,
  UPDATE_NORM,
} from "../Constants/api_roots";
import clearNormValues from "../Utils/clearNormValues";
import { contractFields } from "../Utils/objects/staticFormFields";

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
  const clearValueKeys = Object.keys(values).filter((valueKey) => {
    const fieldNames = Object.keys(contractFields);
    if (!fieldNames.includes(valueKey)) return true;
    return false;
  });

  const clearValues = {};
  clearValueKeys.forEach((key) => (clearValues[key] = values[key]));

  return axios.post(
    `${process.env.REACT_APP_API_ROOT}${ANALIZE}`,
    {
      id: cultureID,
      cultureName: cultureName,
      contractDefinedValues: {
        physicalWeight: +values["Physical weight"],
        intakeMoistureIndexPercentage:
          +values["Intake moisture index percentage"],
        moistureDueToContract: +values["Moisture due to contract"],
        indicatorOfWeedImpurityPercentage:
          +values["Indicator of weed impurity percentage"],
        indicatorOfWeedImpurityToTheContract:
          +values["Indicator of weed impurity to the contract"],
      },
      fieldToCheck: clearValues,
    },
    {
      params: {
        userId: userID,
        organizationId: organizationID,
      },
    }
  );
};
