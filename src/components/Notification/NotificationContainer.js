import React from "react";
import NotificationPresenter from "./NotificationPresenter";
import { useSchedule } from "../../contexts/ScheduleContext";

const NotificationContainer = () => {
  const { state, dispatch } = useSchedule();
  const tmp = state.today?.clone()?.add(1, "days");
  const upcoming =
    state.toDos &&
    Object.keys(state.toDos).filter(
      (todo) => todo === tmp?.format("YYYYMMDD")
    ) >= 0
      ? state.toDos[tmp?.format("YYYYMMDD")]
      : [];
  return (
    <NotificationPresenter
      state={state}
      dispatch={dispatch}
      tmp={tmp}
      upcoming={upcoming}
    ></NotificationPresenter>
  );
};
export default NotificationContainer;
