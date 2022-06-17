import style from "../Assets/Styles/charts.module.scss";
import {
  getStatisticsInTimeDiapason,
  getUserStatisticsInDiapason,
} from "../Services/Statistics";
import generateChartArrayData from "../Utils/generateChartArrayData";
import { TODAY, WEEK_AGO } from "../Constants/time";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import Select from "../Components/Select";
import SuccessDemonstrationChart from "../Components/Chart";
import Spinner from "../Components/Spinner";
import { END_DATE_REPORT, START_DATE_REPORT } from "../Constants/text";
import formatTimeToHTMLStandard from "../Utils/formatTimeToHTMLStandard";
import { MANAGER, WORKER } from "../Constants/roles";

export default function Charts() {
  const [chartArrayData, setChartArray] = useState(null);
  const [selectedIndex, setIndex] = useState(0);
  const [startDate, setStart] = useState(formatTimeToHTMLStandard(WEEK_AGO));
  const [endDate, setEnd] = useState(formatTimeToHTMLStandard(TODAY));

  const { userInfo } = useContext(UserContext);

  const onChangeItem = (cultureName) => {
    setIndex(
      chartArrayData.findIndex((culture) => culture.cultureName === cultureName)
    );
  };

  useEffect(() => {
    if (+userInfo.role === +MANAGER)
      getStatisticsInTimeDiapason(
        startDate,
        endDate,
        userInfo.OrganizationId
      ).then((response) => {
        setChartArray(generateChartArrayData(response.data));
      });
    else if (+userInfo.role === +WORKER)
      getUserStatisticsInDiapason(startDate, endDate, userInfo.UserId).then(
        (response) => {
          setChartArray(generateChartArrayData(response.data));
        }
      );
  }, [userInfo, startDate, endDate]);

  if (chartArrayData)
    return (
      <div className={style.page}>
        <div className={style.chartHolder}>
          <div className={style.chartControl}>
            <div className={style.datePicker}>
              <label>
                <span>{START_DATE_REPORT}</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStart(event.target.value)}
                />
              </label>
              {" - "}
              <label>
                <span>{END_DATE_REPORT}</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(event) => setEnd(event.target.value)}
                />
              </label>
            </div>
            <div className={style.selectHolder}>
              <Select
                disabled={!chartArrayData.length > 0}
                itemList={chartArrayData}
                currentItemIndex={selectedIndex}
                onItemChange={onChangeItem}
              />
            </div>
          </div>
          {chartArrayData.length > 0 ? (
            <SuccessDemonstrationChart
              statistics={chartArrayData[selectedIndex].statistics}
              cultureName={chartArrayData[selectedIndex].cultureName}
            />
          ) : (
            <div className={style.noResults}>No results found</div>
          )}
        </div>
      </div>
    );
  else return <Spinner />;
}
