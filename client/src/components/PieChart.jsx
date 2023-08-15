import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const sectorCounts = {}; // Object to store sector counts
  const topicCounts = {}; // Object to store topic counts
  fetchedData.forEach((item) => {
    const sector = item.sector;
    const topic = item.topic;
    if (sector) {
      sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
    }
    if (topic) {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    }
  });

  // Convert sectorCounts to pieData format
  const sectorPieData = Object.keys(sectorCounts).map((sector) => ({
    id: sector,
    value: sectorCounts[sector],
  }));

  return (
    <>
      <ResponsivePie
        data={sectorPieData}
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
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={4}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 100,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 150,
            itemHeight: 36,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default PieChart;
