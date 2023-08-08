import SingleXaxis from "./SingleXaxis";
import IndividialXaxis from "./IndividualXaxis";
// import Grid from "./Grid";

const MainChart = (props: any) => {
  const { chartType, chartsConfig, gridSpec = "1*1" } = props;

  const renderChartsBasedonChartType = () => {
    switch (chartType) {
      case "singlexaxis":
        return <SingleXaxis chartsConfig={chartsConfig} />;
      case "individualxaxis":
        return (
          <IndividialXaxis chartsConfig={chartsConfig} gridSpec={gridSpec} />
        );
      default:
        return null;
    }
  };

  return renderChartsBasedonChartType();
};

export default MainChart;
