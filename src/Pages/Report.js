import style from "../Assets/Styles/reportPage.module.scss";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { getOrganizationReports } from "../Services/Reports";
import { UserContext } from "../App";
import Logo from "../Components/Logo";
import {
  CONCLUSION_TEXT,
  CONCLUSION_TEXT_NEGATIVE,
  CONCLUSION_TEXT_POSSITIVE,
  DELETE,
  PRINT,
  REPORT_BY_TEXT,
  REPORT_FROM_TEXT,
  REPORT_HEADER_INDICATORS,
  REPORT_HEADER_TEXT,
  SAVE,
  STANDARD_HEADER,
  STANDART_VALUE_PREFIX,
} from "../Constants/text";
import ReportBody from "../Components/ReportBody";
import determineReportMark from "../Utils/determineReportMark";
import { POSSITIVE } from "../Constants/sortTags";
import { reportFooterMargin } from "../Assets/Styles/styleObjects";
import transformMilisecondsToDate from "../Utils/transfromMilisecondsToDate";
import DropdownMenu from "../Components/DropdownMenu";
import buttonStyle from "../Assets/Styles/common/buttons.module.scss";
import createPDF from "../Utils/createPDF";

export default function ReportPage() {
  const { reportID } = useParams();
  const { userInfo } = useContext(UserContext);
  const [reportDetails, setDetails] = useState(null);

  const determineConclusion = (results) => {
    if (!results) return null;

    const mark = determineReportMark(results);
    if (mark === POSSITIVE) return CONCLUSION_TEXT_POSSITIVE;
    return CONCLUSION_TEXT_NEGATIVE;
  };

  const conclusion = determineConclusion(reportDetails?.result?.resultSet);
  const dateString = transformMilisecondsToDate(reportDetails?.checkDate);

  const buttons = [
    {
      text: PRINT,
      className: buttonStyle.transparentBlue_ordinary,
      style: {},
      onClick: () =>
        createPDF(
          reportDetails?.result?.resultSet,
          reportDetails?.standart?.fieldsToCheck,
          conclusion,
          dateString
        ),
    },
    {
      text: SAVE,
      className: buttonStyle.transparentBlue_ordinary,
      style: {},
      onClick: () => alert("Save pdf"),
    },
    {
      text: DELETE,
      className: buttonStyle.transparentRed_ordinary,
      style: {},
      onClick: () => alert("Delete report"),
    },
  ];

  const reportContainerRef = useRef(null);

  useEffect(() => {
    getOrganizationReports(userInfo.OrganizationId).then((reports) => {
      const chosenReport = reports.find((report) => +report.id === +reportID);
      setDetails(chosenReport.fullReportInfo);
    });
  }, [userInfo, reportID]);

  return (
    <div className={style.reportPage}>
      <DropdownMenu buttons={buttons}>
        <div className={style.reportHolder} ref={reportContainerRef}>
          <div className={style.reportHeader}>
            <Logo style={style} />
            <h1 className={style.header}>{REPORT_HEADER_TEXT}</h1>
          </div>
          <div className={style.reportBody}>
            <ReportBody
              header={REPORT_HEADER_INDICATORS}
              dataSet={reportDetails?.result?.resultSet}
            />
            <ReportBody
              header={STANDARD_HEADER}
              dataSet={reportDetails?.standart?.fieldsToCheck}
              additionalEndingString={STANDART_VALUE_PREFIX}
            />
            <div className={style.conclusion}>
              <h2>{CONCLUSION_TEXT}</h2>
              <p>{conclusion}</p>
            </div>
          </div>
          <div
            style={
              reportContainerRef?.current?.scrollHeight <= 710
                ? reportFooterMargin
                : null
            }
            className={style.reportFooter}
          >
            <p>{REPORT_BY_TEXT}</p>
            <p>
              {REPORT_FROM_TEXT} {dateString}
            </p>
          </div>
        </div>
      </DropdownMenu>
    </div>
  );
}
