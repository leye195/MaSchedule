import React from "react";
import CalendarPresenter from "./CalendarPresenter";
import { useSchedule } from "../../contexts/ScheduleContext";
const CalendarContainer = () => {
  const { state: schedule, dispatch } = useSchedule();
  return <CalendarPresenter schedule={schedule} dispatch={dispatch} />;
};

export default CalendarContainer;
