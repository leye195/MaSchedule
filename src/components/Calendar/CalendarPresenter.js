import React, { Component, Fragment } from "react";
import styled from "styled-components";
import styleMixin from "../../style";
import { fadeIn } from "../../animation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { ScheduleConsumer } from "../../contexts/ScheduleContext";

const Container = styled.div`
  position: fixed;
  top: 40px;
  bottom: 0;
  margin: 0;
  height: 310px;
  width: 100%;
  background-color: ${props => props.theme.whiteColor};
  ${styleMixin.flexBoxColumn};
  ${styleMixin.awesomeCard};
`;
const CalendarHeader = styled.div`
  justify-content: center;
  ${styleMixin.flexBoxRow}
  width:100%;
`;
const Today = styled.span`
  cursor: ${props => props.theme.pointer};
  margin: 5px;
  padding: 5px;
  width: 200px;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  color: ${props => props.theme.joustBlue};
  animation: ${fadeIn} 1s ease-out;
  &:hover {
    background-color: #e3e3e3;
    border-radius: 20px;
  }
  &:active {
    /*background-color: rgba(white, 0.2);*/
    animation: ${fadeIn} 1.5s ease-out;
  }
`;
const Button = styled.button`
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
  font-size: 20pt;
  padding: 4px;
  border-radius: 4px;
  &:hover {
    background-color: rgba(white, 0.5);
  }
  &:active {
    background-color: rgba(white, 0.2);
  }
`;
const CalendarBody = styled.div`
  height: 300px;
  max-width: 500px;
  width: 100%;
  animation: ${fadeIn} 1s ease-out;
`;
const Day = styled.div``;
const DayContainer = styled.div`
  padding-bottom: 0px;
  justify-content: space-around;
  text-align: color-interpolation-filters;
  ${styleMixin.flexBoxRow}
  ${Day} {
    margin: 5px;
    font-weight: bold;
    &:first-child {
      color: ${props => props.theme.chigong};
    }
    &:last-child {
      color: ${props => props.theme.eletronColor};
    }
  }
`;
const Date = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 100%;
  color: ${props => (props.isToday ? props.theme.whiteColor : "black")};
  background-color: ${props =>
    props.isToday ? props.theme.eletronColor : "whitesmoke"};
  &:hover {
    background-color: ${props => props.theme.mainColor};
    color: ${props => props.theme.whiteColor};
  }
  &::after {
    content: "";
    border: ${props => (props.haveSchedule ? "1px solid black" : "none")};
  }
`;
const DateContainer = styled.div`
  position: relative;
  margin: 0 !important;
  justify-content: space-around;
  ${styleMixin.flexBoxRow}
  ${Date} {
    width: 12px;
    height: 20px;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    &:first-child {
      color: ${props => props.theme.chigong};
    }
    &:last-child {
      color: ${props => props.theme.eletronColor};
    }
  }
`;
const getCalendarData = (moment, today, selected, selectDate, toDos) => {
  const startWeek = moment
    .clone()
    .startOf("month")
    .week();
  const endWeek =
    moment
      .clone()
      .endOf("month")
      .week() === 1
      ? 53
      : moment
          .clone()
          .endOf("month")
          .week();
  let calendar = [];
  for (let week = startWeek; week <= endWeek; week++) {
    calendar.push(
      <DateContainer key={week}>
        {Array(7)
          .fill(0)
          .map((n, i) => {
            let current = moment
              .clone()
              .week(week)
              .startOf("week")
              .add(n + i, "day");
            const isToday =
              today.format("YYYYMMDD") === current.format("YYYYMMDD")
                ? true
                : false;
            //console.log(current.format("YYYYMMDD"));
            const haveSchedule =
              toDos[current.format("YYYYMMDD")] === undefined ? false : true;
            return (
              <Date
                key={i}
                isToday={isToday}
                haveSchedule={haveSchedule}
                onClick={() => selectDate(current.format("YYYYMMDD"))}
              >
                {current.format("D")}
              </Date>
            );
          })}
      </DateContainer>
    );
  }
  return calendar;
};
const CalendarDay = () => (
  <Fragment>
    <DayContainer>
      <Day>SUN</Day>
      <Day>MON</Day>
      <Day>TUS</Day>
      <Day>WED</Day>
      <Day>THR</Day>
      <Day>FRI</Day>
      <Day>SAT</Day>
    </DayContainer>
    <ScheduleConsumer>
      {store => {
        const {
          state: { moment, today, selected, toDos },
          actions: { selectDate }
        } = store;
        return getCalendarData(moment, today, selected, selectDate, toDos);
      }}
    </ScheduleConsumer>
  </Fragment>
);
class CalendarPresenter extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <CalendarHeader>
            <ScheduleConsumer>
              {store => {
                const { calenderPrev } = store.actions;
                return (
                  <Button onClick={calenderPrev}>
                    <MdChevronLeft />
                  </Button>
                );
              }}
            </ScheduleConsumer>
            <ScheduleConsumer>
              {store => {
                const {
                  state: { moment },
                  actions: { calenderNow }
                } = store;
                return (
                  <Today onClick={calenderNow}>
                    {moment.format("MMMM YYYY")}
                  </Today>
                );
              }}
            </ScheduleConsumer>
            <ScheduleConsumer>
              {store => {
                const { calenderNext } = store.actions;
                return (
                  <Button onClick={calenderNext}>
                    <MdChevronRight />
                  </Button>
                );
              }}
            </ScheduleConsumer>
          </CalendarHeader>
          <CalendarBody>
            <CalendarDay />
          </CalendarBody>
        </Container>
      </Fragment>
    );
  }
}

export default CalendarPresenter;
