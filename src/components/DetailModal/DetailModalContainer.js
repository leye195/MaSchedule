import React from "react";
import DetailModalPresenter from "./DetailModalPresenter";
import { useSchedule } from "../../contexts/ScheduleContext";
import { useDetail } from "../../contexts/DetailContext";
const DetailModalContainer = () => {
  const { state: details, dispatch: detailDispatch } = useDetail();
  const { state: schedule, dispatch: scheduleDispatch } = useSchedule();
  return (
    <DetailModalPresenter
      details={details}
      schedule={schedule}
      detailDispatch={detailDispatch}
      scheduleDispatch={scheduleDispatch}
    />
  );
};

export default DetailModalContainer;
