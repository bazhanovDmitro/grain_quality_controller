import style from "../../Assets/Styles/reports.module.scss";
import {
  LAST_ANALYSIS_REPORTS,
  NEW_FIRST,
  OLD_FIRST,
} from "../../Constants/text";
import Select from "../../Components/Select/index";
import { useState, useEffect, useContext } from "react";
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

const dummyReports = [
  {
    id: "1",
    culture: "Wheat",
    mark: true,
    date: "1652367292842",
    author: "somebody@gmail.com",
  },
  {
    id: "22",
    culture: "Wheat",
    mark: true,
    date: "1652367292823",
    author: "somebody@gmail.com",
  },
  {
    id: "23",
    culture: "Wheat",
    mark: true,
    date: "1652337292842",
    author: "somebody@gmail.com",
  },
  {
    id: "24",
    culture: "Wheat",
    mark: true,
    date: "1652367292846",
    author: "somebody@gmail.com",
  },
  {
    id: "25",
    culture: "Wheat",
    mark: true,
    date: "1652367293123",
    author: "somebody@gmail.com",
  },
  {
    id: "26",
    culture: "Wheat",
    mark: true,
    date: "1652347292842",
    author: "somebody@gmail.com",
  },
  {
    id: "27",
    culture: "Wheat",
    mark: true,
    date: "1652367262442",
    author: "somebody@gmail.com",
  },
  {
    id: "11",
    culture: "Wheat",
    mark: true,
    date: "1652367292811",
    author: "somebody@gmail.com",
  },
  {
    id: "12",
    culture: "Wheat",
    mark: true,
    date: "1624367292842",
    author: "somebody@gmail.com",
  },
  {
    id: "13",
    culture: "Wheat",
    mark: true,
    date: "1652365692842",
    author: "somebody@gmail.com",
  },
  {
    id: "14",
    culture: "Wheat",
    mark: true,
    date: "1522367292842",
    author: "somebody@gmail.com",
  },
  {
    id: "15",
    culture: "Wheat",
    mark: true,
    date: "1652367542842",
    author: "somebody@gmail.com",
  },
  {
    id: "16",
    culture: "Wheat",
    mark: true,
    date: "1652367135682",
    author: "somebody@gmail.com",
  },
  {
    id: "17",
    culture: "Wheat",
    mark: true,
    date: "1452367292842",
    author: "somebody@gmail.com",
  },
  {
    id: "18",
    culture: "Wheat",
    mark: true,
    date: "1652367292432",
    author: "somebody@gmail.com",
  },
  {
    id: "19",
    culture: "Wheat",
    mark: true,
    date: "1636997292842",
    author: "somebody@gmail.com",
  },

  {
    id: "2",
    culture: "Wheat",
    mark: true,
    date: "1652388292442",
    author: "somebody@gmail.com",
  },
  {
    id: "3",
    culture: "Rice",
    mark: true,
    date: "1632367292842",
    author: "somebody@gmail.com",
  },
  {
    id: "4",
    culture: "Corn",
    mark: false,
    date: "1652367214642",
    author: "somebody@gmail.com",
  },
  {
    id: "5",
    culture: "Rice",
    mark: true,
    date: "1622347292842",
    author: "somebody@gmail.com",
  },
  {
    id: "6",
    culture: "Corn",
    mark: false,
    date: "1652369992842",
    author: "somebody@gmail.com",
  },
  {
    id: "7",
    culture: "Rice",
    mark: true,
    date: "1621567249812",
    author: "somebody@gmail.com",
  },
  {
    id: "8",
    culture: "Corn",
    mark: false,
    date: "1652373216542",
    author: "somebody@gmail.com",
  },
];

export default function ReportsTable() {
  const [cultures, setCultureList] = useState([]);
  const [renderList, setRenderList] = useState(cultures);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [order, setOrder] = useState(true);
  const [itemCount, setItemCount] = useState(INPUT_COUNT_ON_SINGLE_PAGE * 2);
  const [page, setPage] = useState(itemCount);

  const { width } = useContext(UserContext);

  const onItemChange = (name) => {
    const culture = cultures.findIndex((culture) => culture.name === name);
    setCurrentIndex(culture);
  };

  const onNextPage = () => setPage((prev) => (prev += itemCount));
  const onPrevPage = () => setPage((prev) => (prev -= itemCount));

  useEffect(() => {
    setCultureList(retrieveCultures(dummyReports));
  }, []);

  useEffect(() => {
    const currentCulture = cultures[currentIndex]?.name;
    const reportList = dummyReports.filter(
      (report) => report.culture === currentCulture
    );
    setRenderList(sortReportsByDate(reportList, order));
  }, [cultures, currentIndex, order]);

  useEffect(() => {
    setPage(itemCount);
  }, [currentIndex, itemCount]);

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

  return (
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
          </div>
        )}
      </div>
      <div className={style.main}>
        {width <= TABLET_VIEW && (
          <div>
            <Select
              itemList={cultures}
              currentItemIndex={currentIndex}
              onItemChange={onItemChange}
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
  );
}
