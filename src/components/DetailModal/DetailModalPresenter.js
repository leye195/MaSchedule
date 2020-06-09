import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import styleMixin from "../../style";
import { openModal } from "../../animation";
import { EDIT_SCHEDULE, DELETE_SCHEDULE } from "../../contexts/ScheduleContext";
import { SET_EDIT, DETAIL_CLOSE } from "../../contexts/DetailContext";
const ModalOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.16);
  display: ${(props) => (props.isOpen === true ? "block" : "none")};
  animation: ${openModal} 0.7s ease-out;
`;
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
  min-height: 450px;
  background-color: ${(props) => props.theme.whiteColor};
  display: ${(props) => (props.isOpen === true ? "flex" : "none")} !important;
  ${styleMixin.flexBoxColumn};
  ${styleMixin.awesomeCard};
  animation: ${openModal} 0.5s ease-out;
`;
const Title = styled.h3`
  width: 100%;
  display: ${(props) => (props.edit ? "none" : "block")};
`;
const Input = styled.input`
  all: unset;
  border: 1px solid #e3e3e3;
  padding: 5px;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  width: 95%;
  font-size: 1rem;
  display: ${(props) => (props.edit ? "block" : "none")};
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
  display: ${(props) => (props.edit ? "none" : "block")};
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
  display: ${(props) => (props.edit ? "none" : "block")};
`;
const Hidden = styled.input``;
const Button = styled.button`
  all: unset;
  margin: 8px;
  padding: 5px;
  width: 95%;
  height: 20px;
  margin: 0px;
  text-align: center;
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
  background-color: ${(props) => props.theme.eletronColor};
  color: ${(props) => props.theme.whiteColor};
  margin: 5px;
  cursor: pointer;
`;
const Delete = styled(Button.withComponent("button"))`
  background-color: ${(props) => props.theme.chigong} !important;
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
`;
const DetailModalPresenter = ({
  details,
  schedule,
  detailDispatch,
  scheduleDispatch,
}) => {
  const Schedule = (props) => {
    const { id, title, time, detail, edit, selected } = props;
    //console.log(props);
    return (
      <Fragment>
        <Back onClick={() => handleClose()}>X</Back>
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
          date={selected?.format("YYYYMMDD")}
          edit={edit}
        />
      </Fragment>
    );
  };
  const handleDelete = (id) => {
    const date = document.getElementById("date").value;
    scheduleDispatch({ type: DELETE_SCHEDULE, payload: { date, id } });
    detailDispatch({ type: SET_EDIT, payload: { flag: false } });
    detailDispatch({ type: DETAIL_CLOSE });
  };
  const handleEdit = (id, edit) => {
    if (edit === false) {
      detailDispatch({ type: SET_EDIT, payload: { flag: true } });
    } else if (edit === true) {
      const title = document.getElementById("titleEdit").value,
        time = document.getElementById("timeEdit").value,
        detail = document.getElementById("detailEdit").value,
        date = document.getElementById("date").value;
      if (title !== "" && time !== "" && detail !== "") {
        scheduleDispatch({
          type: EDIT_SCHEDULE,
          payload: { date: date, info: { id, title, time, detail } },
        });
      }
    }
  };
  const handleClose = () => {
    detailDispatch({ type: SET_EDIT, payload: { flag: false } });
    detailDispatch({ type: DETAIL_CLOSE });
  };
  const ButtonContainer = (props) => {
    const { id, date, edit } = props;
    return (
      <Fragment>
        <Hidden id="date" value={date} type="hidden" />
        <Edit onClick={() => handleEdit(id, edit)}>수정</Edit>
        <Delete onClick={() => handleDelete(id)}>삭제</Delete>
      </Fragment>
    );
  };
  //console.log(details.isDetailOpen);
  return (
    <Fragment>
      <ModalOverLay isOpen={details.isDetailOpen} />
      <Modal isOpen={details.isDetailOpen}>
        <Schedule
          id={details.id}
          title={details.title}
          time={details.time}
          detail={details.detail}
          edit={details.edit}
          selected={schedule.selected}
        />
      </Modal>
    </Fragment>
  );
};

export default DetailModalPresenter;
