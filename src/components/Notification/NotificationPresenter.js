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
const Time = styled.span``;
const Empty = styled(Title.withComponent("p"))`
  width: 100%;
  height: 100%;
  align-self: center;
  justify-self: center;
  text-align: center;
`;
const UpcomingContainer = styled.ul`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
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
          const upcoming = toDos[tmp.format("YYYYMMDD")];
          let new_notice = null;
          if (upcoming !== undefined) {
            new_notice = upcoming.map(item => {
              return (
                <Upcoming>
                  <Time>
                    {tmp.format("MM월DD일")} {item.time}
                  </Time>{" "}
                  {item.title}
                </Upcoming>
              );
            });
          }
          return (
            <Fragment>
              <Notification isOpen={isOpen}>
                <Title>내일 일정</Title>
                <UpcomingContainer>
                  {upcoming === undefined ? (
                    <Empty>일정 없음</Empty>
                  ) : (
                    new_notice
                  )}
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
