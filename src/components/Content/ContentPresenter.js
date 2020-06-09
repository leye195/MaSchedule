import React, { Fragment, useCallback } from "react";
import styled from "styled-components";
import styleMixin from "../../style";
import Calender from "../Calendar";
import Modal from "../Modal";
import DetailModal from "../DetailModal";
import { fadeIn } from "../../animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { OPEN_MODAL } from "../../contexts/ScheduleContext";
import { DETAIL_OPEN, SET_DETAIL } from "../../contexts/DetailContext";
const Container = styled.div`
  position: relative;
  height: 100%;
  ${styleMixin.flexBoxColumn};
  justify-content: center;
  height: 50vh;
`;
const ToDoContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;
const ToDo = styled.li`
  position: relative;
  margin: 10px;
  min-width: 30px;
  width: 80vw;
  cursor: pointer;
  ${styleMixin.awesomeCard};
  ${styleMixin.flexBoxRow};
  animation: ${fadeIn} 2.5s ease-out;
  &:hover {
    background-color: #dfe6e9;
  }
`;
const Button = styled.button`
  border-radius: ${(props) => props.theme.cardRadius};
  padding: 10px 0px;
  width: 50px;
  height: 50px;
  appearance: none;
  cursor: pointer;
  color: ${(props) => props.theme.whiteColor};
  background-color: ${(props) =>
    props.danger ? props.theme.dangerColor : props.theme.successColor};
`;
const Add = styled(Button.withComponent("button"))`
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  background-color: #0984e3;
  margin: 10px;
`;
const Text = styled.p`
  margin-left: 10px;
`;
const Time = styled(Text.withComponent("p"))`
  display: flex;
  align-items: center;
  &::after {
    content: "";
    background-color: black;
    border: 2px solid black;
    height: 100%;
    width: 10px;
    margin: 8px;
  }
  svg {
    margin-right: 10px;
    border: 1.5px solid black;
    border-radius: 50%;
    color: #557cb7;
  }
`;
const Selected = styled.div`
  width: 99%;
  ${styleMixin.awesomeCard};
  border-radius: 0;
  padding: 10px 5px;
`;

const ContentPresenter = ({ schedule, scheduleDispatch, detailDispatch }) => {
  const { toDos, selected } = schedule;
  const handleDetail = useCallback(
    (todo) => (e) => {
      detailDispatch({ type: DETAIL_OPEN });
      detailDispatch({ type: SET_DETAIL, payload: { schedule: todo } });
    },
    []
  );
  const toDoPresenter = (props) => {
    const { todo } = props;
    return (
      <ToDo id={todo.id} key={todo.id} onClick={handleDetail(todo)}>
        <Time>
          <FontAwesomeIcon icon={faClock} size="1x" />
          {todo.time}
        </Time>
        <Text>{todo.title}</Text>
      </ToDo>
    );
  };
  const ToDos = () => {
    const sc =
      toDos &&
      Object.keys(toDos).filter((todo) => todo === selected.format("YYYYMMDD"))
        .length > 0
        ? toDos[selected.format("YYYYMMDD")]
        : undefined;
    //console.log(toDos);
    if (sc !== undefined) {
      const sorted = sc.sort((a, b) => {
        return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
      });
      const toDo = sorted.map((todo) => {
        return toDoPresenter({ todo });
      });
      return toDo;
    }
  };
  return (
    <Fragment>
      <Container>
        <Selected>{schedule.selected?.format("YYYY년 MM월 DD일")}</Selected>
        <ToDoContainer>{ToDos()}</ToDoContainer>
        <Calender />
        <Add onClick={() => scheduleDispatch({ type: OPEN_MODAL })}>추가</Add>
      </Container>
      <Modal />
      <DetailModal />
    </Fragment>
  );
};

export default ContentPresenter;
