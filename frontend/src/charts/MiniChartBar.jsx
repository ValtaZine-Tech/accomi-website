import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import ReactECharts from "echarts-for-react";

// Register necessary components
echarts.use([BarChart, LineChart, PieChart, GridComponent]);

const MiniChartBar = ({ type, data, color }) => {
  const getMiniChartOptions = () => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      show: false,
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: { show: false },
    series: [
      {
        type,
        data,
        lineStyle: {
          width: 2,
          type: "solid",
        },
        label: {
          show: false,
          position: "center",
        },
        itemStyle: { color, borderRadius: 10 },
        barWidth: 8,
        barGap: "60%",
        smooth: false,
        showSymbol: false,
        labelLine: {
          show: false,
        },
      },
    ],
    grid: {
      show: false,
      left: "10%",
      top: 10,
      right: "10%",
      bottom: 10,
      containLabel: false,
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 1,
      borderColor: "#ccc",
    },
  });

  return (
    <ReactECharts
      option={getMiniChartOptions()}
      style={{ width: "100%", height: "100%", margin: "auto" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default MiniChartBar;
