import React from "react";
import AppPresenter from "./AppPresenter";
import { ScheduleProvider } from "../../contexts/ScheduleContext";
import { DetailProvider } from "../../contexts/DetailContext";
const AppContainer = () => {
  return (
    <ScheduleProvider>
      <DetailProvider>
        <AppPresenter />
      </DetailProvider>
    </ScheduleProvider>
  );
};
export default AppContainer;
