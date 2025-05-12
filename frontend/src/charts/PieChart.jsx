import ReactECharts from "echarts-for-react";

const PieChart = () => {

    const getPieChartOptions = () => ({
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
              color: "##111241",
            },
            barWidth: "20%",
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
        option={getPieChartOptions()}
        style={{ height: "100%", width: "100%" }}
      />
    </>
  );
};

export default PieChart;
