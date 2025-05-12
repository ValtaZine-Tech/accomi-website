import ReactECharts from "echarts-for-react";

const LineChart = () => {

    
  const getLineChartOptions = () => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisLine: {
        lineStyle: {
          color: "#8392a5",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#8392a5",
        },
      },
      splitLine: {
        lineStyle: {
          color: "#f8f9fa",
        },
      },
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70],
        type: "line",
        itemStyle: {
          color: "#2c7be5",
        },
        lineStyle: {
          width: 2,
          type: "solid",},
      },
      {
        data: [50, 100, 180, 30, 140, 70, 170, 60, 200, 40, 160, 190],
        type: "line",
        itemStyle: {
          color: "#fdb10e",
        },
        lineStyle: {
          width: 2,
          type: "dotted",},
      },
    ],
    grid: {
      containLabel: true,
      left: "3%",
      right: "3%",
      bottom: "3%",
    },
  });

  return (
    <>
      <ReactECharts
        option={getLineChartOptions()}
        style={{ height: "400px", width: "100%" }}
      />
    </>
  );
};

export default LineChart;
