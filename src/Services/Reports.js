import axios from "axios";
import {
  GET_ORGANIZATION_REPORTS,
  GET_WORKER_REPORTS,
} from "../Constants/api_roots";
import determineReportMark from "../Utils/determineReportMark";

export async function getUserReports(userId) {
  return axios
    .get(`${process.env.REACT_APP_API_ROOT}${GET_WORKER_REPORTS}`, {
      params: {
        userId: userId,
      },
    })
    .then((reports) => {
      return reports.data.map((report) => {
        const date = new Date(report.checkDate);
        return {
          id: report.result.id,
          cultureName: report.standart.cultureName,
          date: date.getTime(),
          mark: determineReportMark(report.result.resultSet),
          author: report.userId,
          fullReportInfo: report,
        };
      });
    });
}

export const getOrganizationReports = async (orgId) => {
  return axios
    .get(`${process.env.REACT_APP_API_ROOT}${GET_ORGANIZATION_REPORTS}`, {
      params: {
        organizationId: orgId,
      },
    })
    .then((reports) => {
      return reports.data.map((report) => {
        const date = new Date(report.checkDate);
        return {
          id: report.result.id,
          cultureName: report.standart.cultureName,
          date: date.getTime(),
          mark: determineReportMark(report.result.resultSet),
          author: report.userId,
          fullReportInfo: report,
        };
      });
    });
};
