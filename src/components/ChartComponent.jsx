"use client";

import React from "react";
import { AgCharts } from "ag-charts-react";
import FadeContent from "./ui/FadeContent";

const ChartComponent = ({ type }) => {
  // Common data for different charts
  const data = [
    { category: "A", value: 30 },
    { category: "B", value: 80 },
    { category: "C", value: 45 },
    { category: "D", value: 60 },
  ];

  // Data for Bubble Chart
  const bubbleData = [
    { x: 10, y: 30, size: 15, category: "A" },
    { x: 20, y: 80, size: 25, category: "B" },
    { x: 30, y: 45, size: 10, category: "C" },
    { x: 40, y: 60, size: 20, category: "D" },
    { x: 50, y: 50, size: 30, category: "E" },
    { x: 10, y: 32, size: 20, category: "F" },
    { x: 20, y: 70, size: 22, category: "G" },
    { x: 30, y: 43, size: 12, category: "H" },
    { x: 40, y: 65, size: 28, category: "I" },
    { x: 100, y: 45, size: 35, category: "J" },
  ];
  
  const chartOptions = {
    bar: {
      data,
      series: [{ type: "bar", xKey: "category", yKey: "value" }],
    },
    line: {
      data,
      series: [{ type: "line", xKey: "category", yKey: "value" }],
    },
    area: {
      data,
      series: [{ type: "area", xKey: "category", yKey: "value" }],
    },
    scatter: {
      data: [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 4, y: 8 },
      ],
      series: [{ type: "scatter", xKey: "x", yKey: "y" }],
    },
    pie: {
      data,
      series: [{ type: "pie", angleKey: "value", labelKey: "category" }],
    },
    donut: {
      data,
      series: [{ type: "donut", angleKey: "value", labelKey: "category", innerRadiusRatio: 0.6 }],
    },
    bubble: {
        data: bubbleData,
        series: [
          {
            type: "bubble",
            xKey: "x",
            yKey: "y",
            sizeKey: "size",
            labelKey: "category", 
          },
        ],
      },
  };

  return  <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}><AgCharts options={chartOptions[type] || chartOptions.line} /></FadeContent>;
};

export default ChartComponent;
