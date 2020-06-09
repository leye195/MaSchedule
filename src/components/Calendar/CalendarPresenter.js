import React, { Fragment } from "react";
import styled from "styled-components";
import styleMixin from "../../style";
import { fadeIn } from "../../animation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  CALENDER_PREV,
  CALENDER_NEXT,
  CALENDER_NOW,
  SELECT_DATE,
} from "../../contexts/ScheduleContext";

const Container = styled.div`
  position: fixed;
  top: 40px;
  bottom: 0;
  margin: 0;
  height: 310px;
  width: 100vw;
  background-color: ${(props) => props.theme.whiteColor};
  ${styleMixin.flexBoxColumn};
  ${styleMixin.awesomeCard};
`;
const CalendarHeader = styled.div`
  justify-content: center;
  ${styleMixin.flexBoxRow}
  width:100%;
`;
const Today = styled.span`
  cursor: ${(props) => props.theme.pointer};
  margin: 5px;
  padding: 5px;
  width: 200px;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.joustBlue};
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
      color: ${(props) => props.theme.chigong};
    }
    &:last-child {
      color: ${(props) => props.theme.eletronColor};
    }
  }
`;
const Date = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 100%;
  color: ${(props) =>
    props.isToday
      ? props.theme.whiteColor
      : props.isSelected
      ? "white"
      : ""} !important;
  background-color: ${(props) =>
    props.isToday
      ? props.theme.eletronColor
      : props.isSelected
      ? "#636e72"
      : "whitesmoke"};
  &:hover {
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.whiteColor};
  }
  &::after {
    content: "";
    border: ${(props) =>
      props.haveSchedule
        ? props.isSelected
          ? "2px solid white"
          : "2px solid black"
        : "none"};
    position: absolute;
    bottom: 2px;
    border-radius: 50%;
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
      color: ${(props) => props.theme.chigong};
    }
    &:last-child {
      color: ${(props) => props.theme.eletronColor};
    }
  }
`;
const CalendarPresenter = ({ schedule, dispatch }) => {
  const CalendarDay = (schedule) => (
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
      {getCalendarData(
        schedule.moment,
        schedule.today,
        schedule.selected,
        schedule.toDos
      )}
    </Fragment>
  );
  const getCalendarData = (moment, today, selected, toDos) => {
    const startWeek = moment?.clone()?.startOf("month")?.week();
    const endWeek =
      moment?.clone()?.endOf("month")?.week() === 1
        ? 53
        : moment?.clone()?.endOf("month")?.week();
    let calendar = [];
    //console.log(selected);
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <DateContainer key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = moment
                ?.clone()
                ?.week(week)
                ?.startOf("week")
                ?.add(n + i, "day");
              const isToday =
                today?.format("YYYYMMDD") === current?.format("YYYYMMDD")
                  ? true
                  : false;
              //console.log(current.format("YYYYMMDD"));
              const haveSchedule =
                (toDos && toDos[current?.format("YYYYMMDD")] === undefined) ||
                toDos[current?.format("YYYYMMDD")].length === 0
                  ? false
                  : true;
              return (
                <Date
                  key={i}
                  isToday={isToday}
                  haveSchedule={haveSchedule}
                  isSelected={
                    current.format("YYYYMMDD") === selected.format("YYYYMMDD")
                  }
                  onClick={() =>
                    dispatch({
                      type: SELECT_DATE,
                      payload: { date: current?.format("YYYYMMDD") },
                    })
                  }
                >
                  {current?.format("D")}
                </Date>
              );
            })}
        </DateContainer>
      );
    }
    return calendar;
  };
  return (
    <Fragment>
      <Container>
        <CalendarHeader>
          <Button
            onClick={() => {
              dispatch({ type: CALENDER_PREV });
            }}
          >
            <MdChevronLeft />
          </Button>
          <Today
            onClick={() => {
              dispatch({ type: CALENDER_NOW });
            }}
          >
            {schedule.moment?.format("MMMM YYYY")}
          </Today>
          <Button
            onClick={() => {
              dispatch({ type: CALENDER_NEXT });
            }}
          >
            <MdChevronRight />
          </Button>
        </CalendarHeader>
        <CalendarBody>{CalendarDay(schedule)}</CalendarBody>
      </Container>
    </Fragment>
  );
};

export default CalendarPresenter;
