import style from "../../Assets/Styles/reports.module.scss";
import {
  LAST_ANALYSIS_REPORTS,
  NEW_FIRST,
  NO_REPORTS_EXISTS,
  OLD_FIRST,
} from "../../Constants/text";
import Select from "../../Components/Select/index";
import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../../App";
import retrieveCultures from "../../Utils/retrieveCultures";
import Item from "./Item";
import Paginator from "../../Components/Paginator/index";
import formStyle from "../../Assets/Styles/form.module.scss";
import {
  INPUT_COUNT_ON_SINGLE_PAGE,
  TABLET_VIEW,
} from "../../Constants/numbers";
import SwitchButton from "../../Components/Buttons/SwitcherButton";
import sortReportsByDate from "../../Utils/sortReportsByDate";
import SortBy from "../../Components/Buttons/SortBy";
import { NEGATIVE, NEUTRAL, POSSITIVE } from "../../Constants/sortTags";
import { ReactComponent as Positive } from "../../Assets/Svg/Positive.svg";
import { ReactComponent as Neutral } from "../../Assets/Svg/Neutral.svg";
import { ReactComponent as Negative } from "../../Assets/Svg/Negative.svg";
import { getOrganizationReports, getUserReports } from "../../Services/Reports";
import { MANAGER, WORKER } from "../../Constants/roles";
import Spinner from "../../Components/Spinner/index";
import NoContent from "../../Components/Table/NoContent";

const sortTags = [
  { id: POSSITIVE, svg: <Positive /> },
  { id: NEUTRAL, svg: <Neutral /> },
  { id: NEGATIVE, svg: <Negative /> },
];

export default function ReportsTable() {
  const [reportList, setReportList] = useState([]);
  const [pageReady, setReadiness] = useState(false);
  const [cultures, setCultureList] = useState([]);
  const [renderList, setRenderList] = useState(cultures);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [order, setOrder] = useState(true);
  const [itemCount, setItemCount] = useState(INPUT_COUNT_ON_SINGLE_PAGE * 2);
  const [page, setPage] = useState(itemCount);

  const [currentSortTag, setSortTag] = useState(NEUTRAL);

  const { width, userInfo } = useContext(UserContext);

  const onItemChange = (name) => {
    const culture = cultures.findIndex(
      (culture) => culture.cultureName === name
    );
    setCurrentIndex(culture);
  };

  const onNextPage = () => setPage((prev) => (prev += itemCount));
  const onPrevPage = () => setPage((prev) => (prev -= itemCount));

  const filterReportsByMarks = useCallback(
    (newRenderList) => {
      return newRenderList.filter(
        (report) => report.mark === currentSortTag || currentSortTag === NEUTRAL
      );
    },
    [currentSortTag]
  );

  useEffect(() => {
    if (+userInfo.role === WORKER)
      getUserReports(userInfo.UserId).then((reports) => {
        setReportList(reports);
        setReadiness(true);
      });
    else if (+userInfo.role === MANAGER)
      getOrganizationReports(userInfo.OrganizationId).then((reports) => {
        setReportList(reports);
        setReadiness(true);
      });
  }, [userInfo]);

  useEffect(() => {
    setCultureList(retrieveCultures(reportList));
  }, [reportList]);

  useEffect(() => {
    const currentCulture = cultures[currentIndex]?.cultureName;
    const filteredReports = reportList.filter(
      (report) => report.cultureName === currentCulture
    );
    setRenderList(
      filterReportsByMarks(sortReportsByDate(filteredReports, order))
    );
  }, [cultures, currentIndex, order, filterReportsByMarks, reportList]);

  useEffect(() => {
    setPage(itemCount);
  }, [currentIndex, currentSortTag, itemCount]);

  useEffect(() => {
    const newItemCount =
      width <= TABLET_VIEW
        ? INPUT_COUNT_ON_SINGLE_PAGE - 1
        : 2 * INPUT_COUNT_ON_SINGLE_PAGE;

    setItemCount((prev) => {
      if (prev !== newItemCount) {
        return newItemCount;
      }
      return prev;
    });
  }, [width]);

  if (pageReady)
    return reportList.length > 0 ? (
      <div className={style.reportsHolder}>
        <div className={style.reportHeader}>
          <div className={style.half}>
            <h1>{LAST_ANALYSIS_REPORTS}</h1>
          </div>
          {width > TABLET_VIEW && (
            <div className={style.half}>
              <Select
                itemList={cultures}
                currentItemIndex={currentIndex}
                onItemChange={onItemChange}
              />
              <SwitchButton
                initialText={NEW_FIRST}
                secondaryText={OLD_FIRST}
                value={order}
                onSwitch={() => setOrder((prev) => !prev)}
              />
              <SortBy
                sortTags={sortTags}
                currentTag={currentSortTag}
                onChange={setSortTag}
              />
            </div>
          )}
        </div>
        <div className={style.main}>
          {width <= TABLET_VIEW && (
            <div className={style.line}>
              <Select
                itemList={cultures}
                currentItemIndex={currentIndex}
                onItemChange={onItemChange}
              />
              <SwitchButton
                initialText={NEW_FIRST}
                secondaryText={OLD_FIRST}
                value={order}
                onSwitch={() => setOrder((prev) => !prev)}
              />
              <SortBy
                sortTags={sortTags}
                currentTag={currentSortTag}
                onChange={setSortTag}
              />
            </div>
          )}
          {renderList.map((report, index) => (
            <Item
              visible={page - itemCount <= index && index < page}
              key={report.id}
              date={report.date}
              mark={report.mark}
              id={report.id}
            />
          ))}
        </div>
        <Paginator
          style={formStyle}
          page={page}
          elementsNumberOnPage={itemCount}
          totalRecordNumber={renderList.length}
          onPageDecrease={onPrevPage}
          onPageIncrease={onNextPage}
        />
      </div>
    ) : (
      <NoContent text={NO_REPORTS_EXISTS} onAdd={null} />
    );
  else return <Spinner />;
}
