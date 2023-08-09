import DataTypeFour from "./DataTypeFour";
import DataTypeOne from "./DataTypeOne";
// import DataTypeOne from "./DataTypeOne";
import HighChart from "./HighChart";
import "./index.css";
import LineChart from "./LineChart";
import XrangeChart from "./XrangeChart";

// const userConfigurationsTypeFour = {
//   minimap: true,
//   // combineZoom: false
// };

// const userConfigurationsTypeOne = {
//   minimap: true,
//   // combineZoom: false
// };

const IndividualXaxis = (props: any) => {
  const { chartsConfig, gridSpec } = props;

  // console.log("gri", gridSpec);
  const gridRows = gridSpec.split("*")[0];
  const gridCols = gridSpec.split("*")[1];
  let presentCol = 0;
  let presentRow = 1;

  const setPresentRowCol = () => {
    if (presentCol == gridCols) {
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
        gap: "10px",
      }}
    >
      {renderChartsInGrid()}
    </div>
  );
};

export default IndividualXaxis;
