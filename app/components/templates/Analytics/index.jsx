import React, { useEffect, useRef, useState } from "react";
import "./style.css";

import AnalyticsView from "../../atoms/AnalyticsView";
import { Select } from "@shopify/polaris";
import { useFetcher } from "@remix-run/react";
import { formatDate } from "../../../utils/clientFunctions";
import { TABS_ENUM } from "../../../utils/constants";
import DateRangeButton from "../../atoms/DateRangePicker/Index";

function getFormattedDates(startDate, endDate) {
  const formattedDates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();

    formattedDates.push(`${month}/${day}/${year}`);
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
  }

  return formattedDates;
}

const Analytics = ({ apps = [], showAppSelection = false, appId = null }) => {
  const fetcher = useFetcher();
  const [selected, setSelected] = useState(apps?.[0]?.id);
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(),
  });
  const [selectedTabs, setSelectedTabs] = useState(
    Object.values(TABS_ENUM).map((item) => item),
  );
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const chartRef = useRef(null);

  const tabs = [
    {
      key: TABS_ENUM.IMPRESSIONS,
      label: "Impressions",
      color: "#e65d4a",
      percentageColor: "#ED8476",
    },
    {
      key: TABS_ENUM.CLICK,
      label: "Clicks",
      color: "#ffa857",
      percentageColor: "#d09c69",
    },
  ];

  const handleSelect = (key) => {
    setSelectedTabs((prevSelected) => {
      let newState = [...prevSelected];
      if (newState.includes(key)) {
        return newState.filter((item) => item != key);
      } else {
        return [...newState, key];
      }
    });
  };

  const options = apps?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleSelectChange = (value) => setSelected(Number(value));

  const getAnalytics = () => {
    fetcher.load(
      `/analytics?appId=${showAppSelection ? selected : appId}&fromDate=${formatDate(selectedDates?.start)}&toDate=${formatDate(selectedDates?.end)}`,
    );
  };

  useEffect(() => {
    getAnalytics();
  }, [selected, selectedDates]);

  useEffect(() => {
    if (fetcher.data) {
      let data = fetcher.data?.analytics
        ?.filter((item) => selectedTabs.includes(item.activityId))
        .filter((item) => item.activityData.length);
      let labels = [];
      data?.forEach((item) =>
        item?.activityData?.forEach((itemData) => {
          if (!labels.includes(itemData.date)) {
            labels.push(itemData.date);
          }
        }),
      );
      setChartData({
        labels: getFormattedDates(selectedDates.start, selectedDates.end),
        datasets: data?.length
          ? data.map((item) => {
              const tabData = tabs.find((tab) => tab.key == item.activityId);
              let gradient = "";
              if (chartRef.current) {
                const ctx = chartRef.current.canvas.getContext("2d");
                if (ctx) {
                  // Create gradient dynamically based on canvas height
                  gradient = ctx.createLinearGradient(
                    0,
                    0,
                    0,
                    chartRef.current.canvas.height,
                  );
                  gradient.addColorStop(0, tabData.color + "80"); // Semi-transparent
                  gradient.addColorStop(1, tabData.color + "00"); // Fully transparent
                }
              }
              return {
                label: tabData.label,
                data: getFormattedDates(selectedDates.start, selectedDates.end)?.map(data => {
                  return {
                    x: data,
                    y: item.activityData.find((activity) => activity.date === data)?.count || 0,
                  }
                }),
                borderColor: tabData.color,
                pointBackgroundColor: tabData.color,
                fill: true,
                backgroundColor: gradient,
                borderWidth: 2,
                tension: 0.4,
              };
            })
          : [],
      });
    }
  }, [fetcher.data, selectedTabs]);

  return (
    <div className="bb-analytics">
      <div className="bb-analytics-head">
        <DateRangeButton
          selectedDates={selectedDates}
          setDate={setSelectedDates}
        />
        {showAppSelection ? (
          <div className="bb-select-btn">
            <Select
              options={options}
              onChange={handleSelectChange}
              value={selected}
            />
          </div>
        ) : null}
      </div>
      <AnalyticsView
        handleSelectTab={handleSelect}
        selectedTabs={selectedTabs}
        tabs={tabs}
        chartData={chartData}
        data={fetcher?.data?.analytics}
        chartRef={chartRef}
      />
    </div>
  );
};

export default Analytics;
