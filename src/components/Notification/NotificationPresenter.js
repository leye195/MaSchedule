import React, { Component, Fragment } from "react";
import styled from "styled-components";
import styleMixin from "../../style";
import { ScheduleConsumer } from "../../contexts/ScheduleContext";
const Notification = styled.div`
  min-height: 200px;
  min-width: 200px;
  background-color: white;
  position: absolute;
  top: 50px;
  right: 0px;
  ${styleMixin.awesomeCard};
  padding: 0;
  overflow: scroll;
  display: ${props => (props.isOpen ? "block" : "none")};
`;
const Title = styled.p`
  margin: 10px;
`;
const UpcomingContainer = styled.ul``;
const Upcoming = styled.li`
  ${styleMixin.noticeliStyle};
`;
class NotificationPresenter extends Component {
  render() {
    return (
      <ScheduleConsumer>
        {store => {
          const {
            state: { isOpen, toDos, today }
          } = store;
          const tmp = today.clone().add(1, "days");
          console.log(tmp);
          return (
            <Fragment>
              <Notification isOpen={isOpen}>
                <Title>Upcoming</Title>
                <UpcomingContainer>
                  <Upcoming></Upcoming>
                  <Upcoming>2</Upcoming>
                  <Upcoming>3</Upcoming>
                </UpcomingContainer>
              </Notification>
            </Fragment>
          );
        }}
      </ScheduleConsumer>
    );
  }
}

export default NotificationPresenter;
