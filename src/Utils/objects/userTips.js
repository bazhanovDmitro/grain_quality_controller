import {
  ABOUT,
  ANALIZER,
  EMPLOYEE_LIST,
  LOGOUT,
  NORMS,
  ORGANIZATION_LIST,
  REPORTS,
} from "../../Constants/links";
import { WORKER, MANAGER, ADMIN } from "../../Constants/roles";

export const workerTips = [
  {
    text: "To analize your grain sample click on the ",
    linkText: "Analyser button at sidebar.",
    link: ANALIZER,
    confirmation: false,
  },
  {
    text: "Any analysis you ever performed you can check at ",
    linkText: "Reports button at sidebar.",
    link: REPORTS,
    confirmation: false,
  },
  {
    text: "To see this hint page from other page click ",
    linkText: "About button at sidebar.",
    link: ABOUT,
    confirmation: false,
  },
  {
    text: "If you are working at public computer it is recomended to logout after you did end your work and download report. To do this click ",
    linkText: "Logout button at sidebar.",
    link: LOGOUT,
    confirmation: true,
  },
];

export const managerTips = [
  {
    text: "To view employees in your organization, click on ",
    linkText: "Employee list button at sidebar.",
    link: EMPLOYEE_LIST,
    confirmation: false,
  },
  {
    text: "Any analysis your workers ever performed you can check at ",
    linkText: "Reports button at sidebar.",
    link: REPORTS,
    confirmation: false,
  },
  {
    text: "To see this hint page from other page click ",
    linkText: "About button at sidebar.",
    link: ABOUT,
    confirmation: false,
  },
  {
    text: "If you are working at public computer it is recomended to logout after you did end your work and download report. To do this click ",
    linkText: "Logout button at sidebar.",
    link: LOGOUT,
    confirmation: true,
  },
];

export const adminTips = [
  {
    text: "To view organizations registered in system, click on ",
    linkText: "Organization list button at sidebar.",
    link: ORGANIZATION_LIST,
    confirmation: false,
  },
  {
    text: "As administrator you can view and edit system norms. To check or edit norms, click on ",
    linkText: "Norms button at sidebar.",
    link: NORMS,
    confirmation: false,
  },
  {
    text: "To see this hint page from other page click ",
    linkText: "About button at sidebar.",
    link: ABOUT,
    confirmation: false,
  },
  {
    text: "If you are working at public computer it is recomended to logout after you did end your work and download report. To do this click ",
    linkText: "Logout button at sidebar.",
    link: LOGOUT,
    confirmation: true,
  },
];

export const TIPS = {
  [WORKER]: workerTips,
  [MANAGER]: managerTips,
  [ADMIN]: adminTips,
};
