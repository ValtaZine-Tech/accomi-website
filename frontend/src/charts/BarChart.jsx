import ReactECharts from "echarts-for-react";

const BarChart = () => {
  const getBarChartOptions = () => ({
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
        type: "bar",
        itemStyle: {
          color: "#2c7be5",
        },
        barWidth: "60%",
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
        option={getBarChartOptions()}
        style={{ height: "400px", width: "100%" }}
      />
    </>
  );
};

export default BarChart;
