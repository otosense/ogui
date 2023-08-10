import "./index.css";
import LineChart from "./LineChart";
import SingleXaxisChart from "./SingleXaxis";
import XrangeChart from "./XrangeChart";

const MainChart = (props: any) => {
  const { chartsConfig, gridSpec } = props;

  // console.log("gri", gridSpec);
  const gridRows = parseInt(gridSpec.split("*")[0]);
  const gridCols = parseInt(gridSpec.split("*")[1]);
  let presentCol = 0;
  let presentRow = 1;

  const setPresentRowCol = () => {
    if (presentCol == gridCols && presentRow < gridRows) {
      presentCol = 1;
      presentRow = presentRow + 1;
    } else {
      presentCol = presentCol + 1;
    }
  };

  const renderChartsInGrid = () => {
    // console.log("sd", sessionChartData);
    return chartsConfig.map((chartData: any, index: number) => {
      {
        setPresentRowCol();
      }
      if (chartData.chart_type == "line") {
        return (
          <div
            style={{
              gridRow: `${presentRow}`,
              gridColumn: `${presentCol}`,
            }}
          >
            <LineChart configs={chartData} />
          </div>
        );
      } else if (chartData.chart_type == "xrange") {
        return (
          <div
            style={{ gridRow: `${presentRow}`, gridColumn: `${presentCol}` }}
          >
            <XrangeChart configs={chartData} />
          </div>
        );
      } else if (chartData.chart_type == "singlexaxis") {
        return (
          <div
            style={{
              gridRow: `${presentRow}`,
              gridColumn: `${presentCol}`,
              width: `${width}%`,
            }}
          >
            <SingleXaxisChart configs={chartData} />
          </div>
        );
      }
    });
  };

  return (
    <div
      className="wrapper"
      style={{
        padding: "0px",
        display: "grid",
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        // gridAutoRows: "100px",
        gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        // gridColumn: 3,
        gap: "10px",
      }}
    >
      {renderChartsInGrid()}
    </div>
  );
};

export default MainChart;
