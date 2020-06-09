import React from "react";
import ContentPresenter from "./ContentPresenter";
import { useSchedule } from "../../contexts/ScheduleContext";
import { useDetail } from "../../contexts/DetailContext";

const ContentContainer = () => {
  const { state, dispatch: scheduleDispatch } = useSchedule();
  const { dispatch: detailDispatch } = useDetail();
  //console.log(schedule.toDos);
  return (
    <ContentPresenter
      schedule={state}
      scheduleDispatch={scheduleDispatch}
      detailDispatch={detailDispatch}
    />
  );
};

export default ContentContainer;
