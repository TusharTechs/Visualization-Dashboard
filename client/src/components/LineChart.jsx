import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    fetch("https://visualization-dashboard-sesb.onrender.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const lineData = fetchedData.reduce((arr, item) => {
    if (item.region && !isNaN(item.end_year) && !isNaN(item.relevance)) {
      const existingRegion = arr.find(
        (dataItem) => dataItem.id === item.region
      );

      if (existingRegion) {
        existingRegion.data.push({
          x: Number(item.end_year),
          y: Number(item.relevance),
        });
      } else {
        arr.push({
          id: item.region,
          data: [
            {
              x: Number(item.end_year),
              y: Number(item.relevance),
            },
          ],
        });
      }
    }
    return arr;
  }, []);

  lineData.forEach((regionData) => {
    if (regionData.data.length > 0) {
      regionData.data.sort((a, b) => a.x - b.x);
      console.log(regionData);
    }
  });

  return (
    <ResponsiveLine
      data={lineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        type: "linear",
        min: 2000,
        max: 2050,
        clamp: true,
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        clamp: true,
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Year",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Relevance",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
