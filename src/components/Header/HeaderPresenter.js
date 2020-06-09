import React, { Fragment } from "react";
import Notification from "../Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import styleMixin from "../../style";
import { CLOSE_NOTICE, OPEN_NOTICE } from "../../contexts/ScheduleContext";
const HeaderContainer = styled.header`
  position: fixed;
  z-index: 9;
  top: 0;
  width: 100vw;
  height: 50px;
  background-color: ${(props) => props.theme.headerColor};
  ${styleMixin.flexBoxRow}
`;
const Logo = styled.div`
  width: 100%;
  font-weight: 800;
  font-size: 20px;
  margin: 5px;
  color: ${(props) => props.theme.logoColor};
  text-shadow: 1px 2px 9px #97b0ff;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;
const MeunContainer = styled.ul`
  position: absolute;
  right: 0px;
  margin-right: 20px;
  font-weight: 600;
  margin: 0;
  margin-right: 10px;
  padding: 0;
  height: ${(props) => props.theme.fullHeight};
  ${styleMixin.flexBoxRow}
`;
const Menu = styled.li`
  position: relative;
  list-style: none;
  height: 100%;
  padding: 0px 5px;
  cursor: pointer;
  svg {
    color: #f1c40f !important;
  }
  ${styleMixin.flexBoxRow}
`;
const Counter = styled.div`
  position: absolute;
  right: 0;
  border-radius: 50%;
  background-color: white;
  justify-content: center;
  text-align: center;
  width: 10px;
  height: 10px;
  ${styleMixin.flexBoxRow}
  ${styleMixin.shadowBox}
`;
const HeaderPresenter = ({ state, dispatch }) => {
  //static contextType = Context;
  //contentType을 이용햐 Context에 저장되있는 전역 객체 접근 , class에서 만 사용 가능한 방법
  const Nav = () => {
    const { notice, isOpen } = state;
    //console.log(notice, isOpen);
    return (
      <MeunContainer>
        <Menu
          onClick={() => {
            isOpen
              ? dispatch({ type: CLOSE_NOTICE })
              : dispatch({ type: OPEN_NOTICE });
          }}
        >
          <FontAwesomeIcon icon={faBell} size="2x" />
          <Counter>{notice || 0}</Counter>
          <Notification />
        </Menu>
      </MeunContainer>
    );
  };
  return (
    <Fragment>
      <HeaderContainer>
        <Logo>MaSchedule</Logo>
        <Nav notice={state.notice} isOpen={state.isOpen} />
      </HeaderContainer>
    </Fragment>
  );
};
export default HeaderPresenter;
