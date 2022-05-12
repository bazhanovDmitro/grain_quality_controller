import style from "../Assets/Styles/reports.module.scss";
import ReportsTable from "../Layouts/ReportsTable";

export default function Reports() {
  return (
    <div className={style.holder}>
      <ReportsTable />
    </div>
  );
}
