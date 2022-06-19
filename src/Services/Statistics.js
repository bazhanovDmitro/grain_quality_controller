import axios from "axios";
import {
  GET_STATISTICS_BY_TIME,
  GET_STATISTICS_BY_TIME_AND_USER,
} from "../Constants/api_roots";

export const getStatisticsInTimeDiapason = async (
  fromInMilliseconds,
  toInMilliseconds,
  companyId
) => {
  const fromDate = new Date(fromInMilliseconds);
  const toDate = new Date(toInMilliseconds);

  const fromISOFormat = fromDate.toISOString();
  const toISOFormat = toDate.toISOString();

  return axios.get(
    `${process.env.REACT_APP_API_ROOT}${GET_STATISTICS_BY_TIME}`,
    {
      params: {
        from: fromISOFormat,
        to: toISOFormat,
        organizationId: companyId,
      },
    }
  );
};

export const getUserStatisticsInDiapason = async (
  fromInMilliseconds,
  toInMilliseconds,
  userId
) => {
  const fromDate = new Date(fromInMilliseconds);
  const toDate = new Date(toInMilliseconds);

  const fromISOFormat = fromDate.toISOString();
  const toISOFormat = toDate.toISOString();

  return axios.get(
    `${process.env.REACT_APP_API_ROOT}${GET_STATISTICS_BY_TIME_AND_USER}`,
    {
      params: {
        from: fromISOFormat,
        to: toISOFormat,
        userId: userId,
      },
    }
  );
};
