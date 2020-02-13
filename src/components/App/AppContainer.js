import React, { Component } from "react";
import AppPresenter from "./AppPresenter";
import { ScheduleProvider } from "../../contexts/ScheduleContext";
import { DetailProvider } from "../../contexts/DetailContext";
class AppContainer extends Component {
  render() {
    return (
      <ScheduleProvider>
        <DetailProvider>
          <AppPresenter />
        </DetailProvider>
      </ScheduleProvider>
    );
  }
}
export default AppContainer;
