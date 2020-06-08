import React, { useEffect } from "react";
import ContentPresenter from "./ContentPresenter";
import { useSchedule } from "../../contexts/ScheduleContext";

const ContentContainer = () => {
  const { schedule, actions } = useSchedule();
  useEffect(() => {
    const { loadData } = actions;
    loadData();
  }, []);
  return <ContentPresenter schedule={schedule} />;
};

export default ContentContainer;
