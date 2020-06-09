import React from "react";
import styled from "styled-components";
import styleMixin from "../../style";
const Notification = styled.div`
  min-height: 200px;
  min-width: 200px;
  background-color: white;
  position: absolute;
  right: 0px;
  ${styleMixin.awesomeCard};
  padding: 0;
  overflow: scroll;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  transform: translateY(12.5vh);
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
  margin-left: 5px;
`;
const NotificationPresenter = ({ state, dispatch, upcoming, tmp }) => {
  const { isOpen } = state;
  return (
    <>
      <Notification isOpen={isOpen}>
        <Title>내일 일정</Title>
        <UpcomingContainer>
          {upcoming === undefined ? (
            <Empty>일정 없음</Empty>
          ) : (
            upcoming
              .sort((x, y) => (x.time > y.time ? 1 : -1))
              .map((item) => {
                return (
                  <Upcoming key={item._id}>
                    <Time>
                      {tmp?.format("MM월DD일")} {item.time}
                    </Time>{" "}
                    {item.title}
                  </Upcoming>
                );
              })
          )}
        </UpcomingContainer>
      </Notification>
    </>
  );
};

export default NotificationPresenter;
