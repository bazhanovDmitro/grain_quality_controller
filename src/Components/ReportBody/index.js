import style from "../../Assets/Styles/reportPage.module.scss";

export default function ReportBody({
  header,
  dataSet,
  additionalEndingString,
}) {
  const renderResults = (dataSet) => {
    const dataSetKeys = Object.keys(dataSet);
    const dataToRender = dataSetKeys.map((key) => {
      return (
        <div className={style.row} key={key}>
          <span>{key}</span>{" "}
          <div>
            {additionalEndingString}
            <span
              style={additionalEndingString ? { fontWeight: `bold` } : null}
            >
              {dataSet[key]}
            </span>
          </div>
        </div>
      );
    });

    return dataToRender;
  };

  return (
    dataSet && (
      <div className={style.indicators}>
        <h2>{header}</h2>
        {renderResults(dataSet)}
      </div>
    )
  );
}
