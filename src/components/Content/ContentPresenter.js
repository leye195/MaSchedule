import React, { Component, Fragment } from "react";
import styled from "styled-components";
import styleMixin from "../../style";
import Calender from "../Calendar";
import Modal from "../Modal";
import DetailModal from "../DetailModal";
import { fadeIn } from "../../animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Context, ScheduleConsumer } from "../../contexts/ScheduleContext";
import { DetailConsumer } from "../../contexts/DetailContext";
const Container = styled.div`
  position: relative;
  height: 100%;
  min-height: 400px;
  ${styleMixin.flexBoxColumn};
  justify-content: center;
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
  width: 700px;
  cursor: pointer;
  ${styleMixin.awesomeCard};
  ${styleMixin.flexBoxRow};
  animation: ${fadeIn} 2.5s ease-out;
  &:hover {
    background-color: #dfe6e9;
  }
`;

const Button = styled.button`
  border-radius: ${props => props.theme.cardRadius};
  padding: 10px 0px;
  width: 50px;
  height: 50px;
  appearance: none;
  cursor: pointer;
  color: ${props => props.theme.whiteColor};
  background-color: ${props =>
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
const handleDetail = (todo, detailOpen, setInfo) => {
  detailOpen();
  setInfo(todo);
};
const toDoPresenter = todo => {
  return (
    <DetailConsumer>
      {store => {
        const { detailOpen, setInfo } = store.actions;
        return (
          <ToDo
            id={todo.id}
            key={todo.id}
            onClick={() => handleDetail(todo, detailOpen, setInfo)}
          >
            <Time>
              <FontAwesomeIcon icon={faClock} size="1x" />
              {todo.time}
            </Time>
            <Text>{todo.title}</Text>
          </ToDo>
        );
      }}
    </DetailConsumer>
  );
};
class ContentPresenter extends Component {
  handleEdit = () => {};
  render() {
    return (
      <Fragment>
        <Container>
          <ScheduleConsumer>
            {store => {
              const {
                state: { selected }
              } = store;
              return <Selected>{selected.format("YYYY년 MM월 DD일")}</Selected>;
            }}
          </ScheduleConsumer>
          <ToDoContainer>
            <ScheduleConsumer>
              {store => {
                const {
                  state: { toDos, selected }
                } = store;
                console.log(toDos);
                const schedule = toDos[selected.format("YYYYMMDD")];
                if (schedule !== undefined) {
                  const sorted = schedule.sort((a, b) => {
                    return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
                  });
                  const toDo = sorted.map(todo => {
                    return toDoPresenter(todo);
                  });
                  //console.log(toDo);
                  return toDo;
                }
              }}
            </ScheduleConsumer>
          </ToDoContainer>
          <Calender />
          <ScheduleConsumer>
            {store => {
              const { modalOpen } = store.actions;
              return <Add onClick={modalOpen}>추가</Add>;
            }}
          </ScheduleConsumer>
        </Container>
        <Modal />
        <DetailModal />
      </Fragment>
    );
  }
}

export default ContentPresenter;
