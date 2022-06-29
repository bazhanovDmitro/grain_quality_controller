import { SEVEN_DAYS_IN_MILLISECONDS } from "./numbers";

const now = new Date().getTime() + 2629800000;
export const TODAY = new Date(now);
export const WEEK_AGO = new Date(+TODAY.getTime() - SEVEN_DAYS_IN_MILLISECONDS);
