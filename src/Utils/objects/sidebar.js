import { ReactComponent as Analizer } from "../../Assets/Svg/Analizer.svg";
import { ReactComponent as Report } from "../../Assets/Svg/Report.svg";
import { ReactComponent as Wheat } from "../../Assets/Svg/Wheat.svg";
import { ReactComponent as Gear } from "../../Assets/Svg/Gear.svg";
import { ReactComponent as Human } from "../../Assets/Svg/Human.svg";
import { ReactComponent as Humans } from "../../Assets/Svg/Humans.svg";
import { ReactComponent as Chart } from "../../Assets/Svg/chart.svg";
import {
  ANALIZER_TEXT,
  CHANGE_CREDENTIALS_TEXT,
  REPORTS_TEXT,
  ABOUT_TEXT,
  EMPLOYEE_LIST_TEXT,
  ORGANIZATION_LIST_TEXT,
  NORMS_TEXT,
  CHARTS_SIDEBAR_BUTTON_TEXT,
} from "../../Constants/text";
import {
  ANALIZER,
  CHANGE_CREDENTIALS,
  REPORTS,
  ABOUT,
  EMPLOYEE_LIST,
  ORGANIZATION_LIST,
  NORMS,
  CHARTS,
} from "../../Constants/links";
import { MANAGER, ADMIN, WORKER } from "../../Constants/roles";

const WORKER_BUTTONS = [
  {
    link: ANALIZER,
    svg: <Analizer />,
    text: ANALIZER_TEXT,
  },
  {
    link: REPORTS,
    svg: <Report />,
    text: REPORTS_TEXT,
  },
  {
    link: ABOUT,
    svg: <Wheat />,
    text: ABOUT_TEXT,
  },
  {
    link: CHANGE_CREDENTIALS,
    svg: <Gear />,
    text: CHANGE_CREDENTIALS_TEXT,
  },
  {
    link: CHARTS,
    svg: <Chart />,
    text: CHARTS_SIDEBAR_BUTTON_TEXT,
  },
];

const MANAGER_BUTTONS = [
  {
    link: EMPLOYEE_LIST,
    svg: <Human />,
    text: EMPLOYEE_LIST_TEXT,
  },
  {
    link: REPORTS,
    svg: <Report />,
    text: REPORTS_TEXT,
  },
  {
    link: ABOUT,
    svg: <Wheat />,
    text: ABOUT_TEXT,
  },
  {
    link: CHANGE_CREDENTIALS,
    svg: <Gear />,
    text: CHANGE_CREDENTIALS_TEXT,
  },
  {
    link: CHARTS,
    svg: <Chart />,
    text: CHARTS_SIDEBAR_BUTTON_TEXT,
  },
];

const ADMIN_BUTTONS = [
  {
    link: ORGANIZATION_LIST,
    svg: <Humans />,
    text: ORGANIZATION_LIST_TEXT,
  },
  {
    link: NORMS,
    svg: <Report />,
    text: NORMS_TEXT,
  },
  {
    link: ABOUT,
    svg: <Wheat />,
    text: ABOUT_TEXT,
  },
  {
    link: CHANGE_CREDENTIALS,
    svg: <Gear />,
    text: CHANGE_CREDENTIALS_TEXT,
  },
];

export const SIDEBAR_BUTTONS = {
  [WORKER]: WORKER_BUTTONS,
  [MANAGER]: MANAGER_BUTTONS,
  [ADMIN]: ADMIN_BUTTONS,
};

export const SIDEBAR_TABLET_STYLE = {
  position: "fixed",
  left: "-400px",
  width: "400px",
  transition: "ease-in-out 0.2s",
};

export const SIDEBAR_MOBILE_STYLE = {
  position: "fixed",
  left: "-100vw",
  width: "100vw",
  transition: "ease-in-out 0.2s",
};

export const SIDEBAR_TABLET_MARGIN = `400px`;
export const SIDEBAR_MOBILE_MARGIN = `100vw`;
export const SIDEBAR_CLOSED_MARGIN = `0px`;
