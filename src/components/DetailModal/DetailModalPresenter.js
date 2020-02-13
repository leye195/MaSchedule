import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import styleMixin from "../../style";
import { openModal } from "../../animation";
import { ScheduleConsumer } from "../../contexts/ScheduleContext";
import { DetailConsumer } from "../../contexts/DetailContext";
const ModalOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.16);
  display: ${props => (props.isOpen === true ? "block" : "none")};
  animation: ${openModal} 0.7s ease-out;
`;
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
  min-height: 450px;
  background-color: ${props => props.theme.whiteColor};
  display: ${props => (props.isOpen === true ? "flex" : "none")} !important;
  ${styleMixin.flexBoxColumn};
  ${styleMixin.awesomeCard};
  animation: ${openModal} 0.5s ease-out;
`;
const Title = styled.h3`
  width: 100%;
  display: ${props => (props.edit ? "none" : "block")};
`;
const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  margin-top: 20px;
  padding: 5px 0;
  display: ${props => (props.edit ? "block" : "none")};
`;
const DetailInput = styled(Input.withComponent("textarea"))`
  resize: none;
  flex: 1;
  margin-top: 5px;
`;
const Time = styled.p`
  width: 100%;
  border-bottom: 1px solid #5858587d;
  font-size: 0.9rem;
  display: ${props => (props.edit ? "none" : "block")};
  svg {
    margin-right: 5px;
    color: #557cb7;
  }
`;
const Detail = styled.p`
  flex-grow: 1;
  width: 100%;
  margin: 5px 5px;
  overflow-y: scroll;
  white-space: pre;
  display: ${props => (props.edit ? "none" : "block")};
`;
const Hidden = styled.input``;
const Button = styled.button`
  margin: 8px;
  padding: 5px;
  width: 100%;
  height: 35px;
  margin: 0px;
  ${styleMixin.awesomeCard};
`;
const Back = styled.p`
  position: absolute;
  right: 0;
  cursor: pointer;
  margin: 0;
  margin-right: 10px;
  font-weight: 800;
`;
const Edit = styled(Button.withComponent("button"))`
  background-color: ${props => props.theme.eletronColor};
  color: ${props => props.theme.whiteColor};
  margin: 5px;
`;
const Delete = styled(Button.withComponent("button"))`
  background-color: ${props => props.theme.chigong} !important;
  color: ${props => props.theme.whiteColor};
`;
const handleDelete = (id, deleteTodo, detailClose, setEdit) => {
  const date = document.getElementById("date").value;
  deleteTodo(date, id);
  setEdit(false);
  detailClose();
};
const handleEdit = (id, edit, setEdit, editTodo) => {
  if (edit === false) {
    setEdit(true);
  } else if (edit === true) {
    const title = document.getElementById("titleEdit").value,
      time = document.getElementById("timeEdit").value,
      detail = document.getElementById("detailEdit").value,
      date = document.getElementById("date").value;
    if (title !== "" && time !== "" && detail !== "") {
      console.log(id, date, title, time, detail);
      editTodo(date, { id, title, time, detail });
    }
  }
};
const handleClose = (detailClose, setEdit) => {
  setEdit(false);
  detailClose();
};
const ButtonContainer = props => {
  const { id, date, deleteTodo, detailClose, setEdit, edit, editTodo } = props;
  return (
    <Fragment>
      <Hidden id="date" value={date} type="hidden" />
      <Edit onClick={() => handleEdit(id, edit, setEdit, editTodo)}>수정</Edit>
      <Delete
        onClick={() => handleDelete(id, deleteTodo, detailClose, setEdit)}
      >
        삭제
      </Delete>
    </Fragment>
  );
};

const Schedule = props => {
  const { id, title, time, detail, detailClose, edit, setEdit } = props;
  return (
    <ScheduleConsumer>
      {store => {
        const {
          state: { selected },
          actions: { deleteTodo, editTodo }
        } = store;
        return (
          <Fragment>
            <Back onClick={() => handleClose(detailClose, setEdit)}>X</Back>
            <Title id="title" edit={edit}>
              {title}
            </Title>
            <Input
              id="titleEdit"
              type="text"
              defaultValue={title}
              edit={edit}
              required
            />
            <Time id="time" edit={edit}>
              <FontAwesomeIcon icon={faClock} size="1x" />
              {time}
            </Time>
            <Input id="timeEdit" type="time" edit={edit} required />
            <Detail id="detail" edit={edit}>
              {detail}
            </Detail>
            <DetailInput
              id="detailEdit"
              defaultValue={detail}
              edit={edit}
              required
            />
            <ButtonContainer
              id={id}
              date={selected.format("YYYYMMDD")}
              deleteTodo={deleteTodo}
              detailClose={detailClose}
              setEdit={setEdit}
              edit={edit}
              editTodo={editTodo}
            />
          </Fragment>
        );
      }}
    </ScheduleConsumer>
  );
};
class DetailModalPresenter extends Component {
  render() {
    return (
      <DetailConsumer>
        {store => {
          const {
            state: { id, title, time, detail, isDetailOpen, edit },
            actions: { detailClose, setEdit }
          } = store;
          return (
            <Fragment>
              <ModalOverLay isOpen={isDetailOpen} />
              <Modal isOpen={isDetailOpen}>
                <Schedule
                  id={id}
                  title={title}
                  time={time}
                  detail={detail}
                  detailClose={detailClose}
                  edit={edit}
                  setEdit={setEdit}
                />
              </Modal>
            </Fragment>
          );
        }}
      </DetailConsumer>
    );
  }
}

export default DetailModalPresenter;
