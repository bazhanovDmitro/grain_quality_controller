import style from "../../Assets/Styles/charts.module.scss";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { SUCCESSFUL_CASES, TOTAL_REPORT_NUMBER } from "../../Constants/text";
import {
  CHART_BLUE,
  CHART_FADED_GREEN,
  CHART_SOLID_GREEN,
} from "../../Assets/Styles/common/colors";

export default function SuccessDemonstrationChart({ statistics, cultureName }) {
  const canvasRef = useRef(null);

  const canvas = <canvas ref={canvasRef}></canvas>;

  const retrieveAssosiatedInformation = (statistics) => {
    const labels = statistics.map((dateReport) => {
      const date = new Date(dateReport.date);
      return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    });
    const reportCount = statistics.map(
      (dateReport) => dateReport.negative + dateReport.possitive
    );
    const possitiveReports = statistics.map(
      (dateReport) => dateReport.possitive
    );

    return {
      labels: labels,
      reportCount: reportCount,
      possitiveReports: possitiveReports,
    };
  };

  useEffect(() => {
    const chartBuildInformation = retrieveAssosiatedInformation(statistics);
    const myChart = new Chart(canvasRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels: chartBuildInformation.labels,
        datasets: [
          {
            label: TOTAL_REPORT_NUMBER,
            data: chartBuildInformation.reportCount,
            borderColor: [CHART_BLUE],
            borderWidth: 1,
            fill: false,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
          {
            label: SUCCESSFUL_CASES,
            data: chartBuildInformation.possitiveReports,
            backgroundColor: [CHART_FADED_GREEN],
            borderColor: [CHART_SOLID_GREEN],
            borderWidth: 1,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grace: "200%",
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [statistics]);

  return <div className={style.canvas}>{canvas}</div>;
}
