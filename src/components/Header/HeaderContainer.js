import React, { useEffect } from "react";
import HeaderPresenter from "./HeaderPresenter";
import { useSchedule, SET_NOTIFICATION } from "../../contexts/ScheduleContext";
const HeaderContainer = () => {
  const { dispatch, state } = useSchedule();
  useEffect(() => {
    const { toDos, today } = state;
    const tmp = today.clone();
    const comingSchedule = toDos[tmp.add(1, "days").format("YYYYMMDD")];
    if (comingSchedule !== undefined) {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { cnt: comingSchedule.length },
      });
    }
  }, [dispatch]);
  return <HeaderPresenter state={state} dispatch={dispatch} />;
};
export default HeaderContainer;
