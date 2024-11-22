import React, { useEffect, useState } from "react";
import "./style.css";

import AnalyticsView from "../../atoms/AnalyticsView";
import { Select } from "@shopify/polaris";
import { useFetcher } from "@remix-run/react";
import { formatDate } from "../../../utils/clientFunctions";
import { TABS_ENUM } from "../../../utils/constants";
import DateRangeButton from "../../atoms/DateRangePicker/Index";

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

  const tabs = [
    { key: TABS_ENUM.IMPRESSIONS, label: "Impressions", color: "#7e57c2" },
    { key: TABS_ENUM.CLICK, label: "Clicks", color: "#ff7043" },
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
        labels: labels,
        datasets: data?.length
          ? data.map((item) => {
              const tabData = tabs.find((tab) => tab.key == item.activityId);
              return {
                label: tabData.label,
                data: item.activityData.map((data) => ({
                  x: data.date,
                  y: data.count,
                })),
                borderColor: tabData.color,
                backgroundColor: tabData.color,
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
      />
    </div>
  );
};

export default Analytics;
