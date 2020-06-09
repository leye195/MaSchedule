import React, { Fragment, useCallback } from "react";
import styled from "styled-components";
import styleMixin from "../../style";
import { v4 } from "uuid";
import { openModal } from "../../animation";
import {
  ADD_SCHEDULE,
  CLOSE_MODAL,
  useSchedule,
} from "../../contexts/ScheduleContext";
const SCHEDULE = "SCHEDULE";
const ModalOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.16);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  animation: ${openModal} 0.7s ease-out;
`;
const Modal = styled.div`
  position: fixed;
  display: ${(props) => (props.isOpen ? "block" : "none")} !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  background-color: ${(props) => props.theme.whiteColor};
  ${styleMixin.flexBoxColumn};
  ${styleMixin.awesomeCard};
  animation: ${openModal} 0.5s ease-out;
`;
const ModalTitle = styled.p`
  text-align: center;
  width: 100%;
`;
const ModalContent = styled.div``;
const Form = styled.form`
  ${styleMixin.flexBoxColumn};
`;
const Input = styled.input`
  margin: 8px;
  padding: 5px;
  width: 100%;
`;
const Title = styled(Input.withComponent("input"))`
  width: 90%;
  padding: 5px 10px;
`;
const Time = styled(Input.withComponent("input"))`
  width: 90%;
  padding: 5px 10px;
`;
const Detail = styled(Input.withComponent("textarea"))`
  resize: none;
  margin: 0;
  width: 90%;
  height: 200px;
  border: 1px solid #2d2d2d40;
  ${styleMixin.awesomeCard}
`;
const Submit = styled(Input.withComponent("input"))`
  height: 35px;
  background-color: ${(props) => props.theme.successColor} !important;
  color: ${(props) => props.theme.whiteColor};
  ${styleMixin.awesomeCard};
`;
const Cancel = styled(Input.withComponent("button"))`
  height: 35px;
  margin: 0px;
  background-color: ${(props) => props.theme.chigong} !important;
  color: ${(props) => props.theme.whiteColor};
  ${styleMixin.awesomeCard};
`;
const ModalPresenter = () => {
  const { state, dispatch } = useSchedule();
  //console.log(state);
  const FormContainer = (props) => (
    <Fragment>
      <Form onSubmit={props.submit}>
        <Title type="text" name="title" placeholder="일정 제목" required />
        <Time type="time" required />
        <Detail type="text" name="detail" placeholder="세부 내용" required />
        <Submit type="submit" />
      </Form>
      <Cancel onClick={() => dispatch({ type: CLOSE_MODAL })}>취소</Cancel>
    </Fragment>
  );
  const saveData = useCallback(
    (selected, todo) => {
      const local = localStorage.getItem(SCHEDULE);
      const newId = v4();
      let obj = {};
      if (local === null) {
        obj = JSON.stringify({
          [selected.format("YYYYMMDD")]: [
            {
              id: newId,
              title: todo[0],
              time: todo[1],
              detail: todo[2],
              done: false,
            },
          ],
        });
        localStorage.setItem(SCHEDULE, obj);
      } else {
        obj = JSON.parse(local);
        if (obj[selected.format("YYYYMMDD")] !== undefined) {
          localStorage.setItem(
            SCHEDULE,
            JSON.stringify({
              ...obj,
              [selected.format("YYYYMMDD")]: [
                ...obj[selected.format("YYYYMMDD")],
                {
                  id: newId,
                  title: todo[0],
                  time: todo[1],
                  detail: todo[2],
                  done: false,
                },
              ],
            })
          );
        } else {
          localStorage.setItem(
            SCHEDULE,
            JSON.stringify({
              ...obj,
              [selected.format("YYYYMMDD")]: [
                {
                  id: newId,
                  title: todo[0],
                  time: todo[1],
                  detail: todo[2],
                  done: false,
                },
              ],
            })
          );
        }
      }
      dispatch({
        type: ADD_SCHEDULE,
        payload: {
          toDo: {
            id: newId,
            title: todo[0],
            time: todo[1],
            detail: todo[2],
            done: false,
          },
          date: selected.format("YYYYMMDD"),
        },
      });
    },
    [dispatch]
  );
  const handleSubmit = useCallback(
    (selected) => (e) => {
      e.preventDefault();
      const { target } = e;
      const todo = [];
      for (let i = 0; i < target.elements.length - 1; i++) {
        todo.push(target.elements[i].value);
        target.elements[i].value = "";
      }
      saveData(selected, todo);
      dispatch({ type: CLOSE_MODAL });
    },
    [dispatch, saveData]
  );
  //console.log(state.isMadalOpen);
  return (
    <Fragment>
      <ModalOverLay isOpen={state.isMadalOpen} />
      <Modal isOpen={state.isMadalOpen}>
        <ModalTitle>
          새 일정 {state.selected?.format("YYYY년 MM월 DD일")}
        </ModalTitle>
        <ModalContent>
          <FormContainer submit={handleSubmit(state.selected)} />
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ModalPresenter;
