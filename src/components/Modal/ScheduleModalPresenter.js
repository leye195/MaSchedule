import React, { Fragment, useContext, useCallback } from "react";
import styled from "styled-components";
import styleMixin from "../../style";
import { v4 } from "uuid";
import { openModal } from "../../animation";
import { ScheduleConsumer, useSchedule } from "../../contexts/ScheduleContext";
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
  min-width: 350px;
  min-height: 350px;
  background-color: ${(props) => props.theme.whiteColor};
  ${styleMixin.flexBoxColumn};
  ${styleMixin.awesomeCard};
  animation: ${openModal} 0.5s ease-out;
`;
const ModalTitle = styled.p`
  text-align: center;
  width: ${(props) => props.theme.fullWidth};
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
const FormContainer = (props) => (
  <Fragment>
    <Form onSubmit={props.submit}>
      <Title type="text" name="title" placeholder="일정 제목" required />
      <Time type="time" required />
      <Detail type="text" name="detail" placeholder="세부 내용" required />
      <Submit type="submit" />
    </Form>
    <Cancel onClick={props.cancel}>취소</Cancel>
  </Fragment>
);
const ModalPresenter = () => {
  const { schedule, actions } = useSchedule();
  const saveData = (selected, todo, loadData) => {
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
    loadData();
  };
  const handleSubmit = useCallback(
    (selected, loadData, modalClose) => (e) => {
      console.log(selected);
      e.preventDefault();
      const { target } = e;
      const todo = [];
      for (let i = 0; i < target.elements.length - 1; i++) {
        todo.push(target.elements[i].value);
        target.elements[i].value = "";
      }
      saveData(selected, todo, loadData);
      modalClose();
    },
    []
  );
  return (
    <Fragment>
      <ScheduleConsumer>
        {(store) => {
          const { isMadalOpen, selected } = schedule;
          const { modalClose, loadData } = actions;
          //console.log(isMadalOpen);
          return (
            <Fragment>
              <ModalOverLay isOpen={isMadalOpen} />
              <Modal isOpen={isMadalOpen}>
                <ModalTitle>
                  새 일정 {selected?.format("YYYY년 MM월 DD일")}
                </ModalTitle>
                <ModalContent>
                  <FormContainer
                    submit={handleSubmit(selected, loadData, modalClose)}
                    cancel={modalClose}
                  />
                </ModalContent>
              </Modal>
            </Fragment>
          );
        }}
      </ScheduleConsumer>
    </Fragment>
  );
};

export default ModalPresenter;
