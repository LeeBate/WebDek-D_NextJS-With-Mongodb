import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dynamic from "next/dynamic";
import BaseCard from "../baseCard/BaseCard";

import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import { Slide } from "react-slideshow-image";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  const tools = [];
  const name = [];
  const max = null;

  useEffect(() => {
    const data = [];

    orders.map((item) => {
      data.push({ [item.title]: item.title });
    });

    console.log(data);

    let final = [];

    const countTools = data.reduce((acc, current) => {
      const tool = Object.keys(current)[0];

      acc[tool] = (acc[tool] || 0) + 1;
      final.push({ title: Object.keys(current)[0], qty: acc[tool] });
      return acc;
    }, {});

    const result = final.reduce((acc, curr) => {
      const item = acc.find((i) => i.title === curr.title);
      if (item) {
        console.log("item.qty", item.qty);
        console.log("curr.qty", curr.qty);
        item.qty += curr.qty;
        item.qty = curr.qty;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    let datafinal = result.sort((a, b) => {
      return b.qty - a.qty;
    });

    console.log(datafinal);

    datafinal = datafinal.slice(0, 10);

    datafinal.map((item) => {
      name.push(item.title);
      tools.push(item.qty);
    });
    console.log(name);
    console.log(tools);

    max = Math.max(...tools);

    setoptionssalesoverview({
      grid: {
        show: true,
        borderColor: "transparent",
        strokeDashArray: 2,
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "42%",
          endingShape: "rounded",
          borderRadius: 5,
        },
      },

      colors: ["#fb9678", "#03c9d7"],
      fill: {
        type: "solid",
        opacity: 1,
      },
      chart: {
        offsetX: -15,
        toolbar: {
          show: false,
        },
        foreColor: "#adb0bb",
        fontFamily: "'DM Sans',sans-serif",
        sparkline: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      legend: {
        show: false,
      },
      xaxis: {
        type: "category",
        categories: name,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
      },
      yaxis: {
        show: true,
        min: 1,
        max: 10,
        tickAmount: 3,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
      },
      stroke: {
        show: true,
        width: 5,
        lineCap: "butt",
        colors: ["transparent"],
      },
      tooltip: {
        theme: "dark",
      },
    });
    setseriessalesoverview([
      {
        name: "จำนวนเครื่องมือ",
        data: tools,
      },
    ]);
  }, [orders]);
  const [optionssalesoverview, setoptionssalesoverview] = useState({
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },

    colors: ["#fb9678", "#03c9d7"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: name,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 1,
      max: 10,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  });
  const [seriessalesoverview, setseriessalesoverview] = useState([
    {
      name: "จำนวนเครื่องมือ",
      data: tools,
    },
  ]);

  return (
    <BaseCard title="10อันดับเครื่องมือที่ถูกจองมากที่สุด">
      <Chart
        options={optionssalesoverview}
        series={seriessalesoverview}
        type="bar"
        height="295px"
      />
    </BaseCard>
  );
};

export default SalesOverview;
