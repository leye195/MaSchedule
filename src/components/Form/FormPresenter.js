import React, { Component, Fragment } from "react";
import styled from "styled-components";
import styleMixin from "../../style";
import img1 from "../../img/thought.jpg";

const Input = styled.input.attrs({ required: true })`
  border-radius: 10px;
  border: none;
  margin: 10px;
  font-size: 1.1rem;
  width: 50%;
  ${styleMixin.awesomeCard}
`;
const Card = styled.form`
  background-color: white;
  margin-top: 10px;
  padding-top: 60px;
  height: 300px;
  background-image: url(${img1});
  background-size: cover;
  justify-content: center;
  visibility: hidden;
  background-color: ${(props) => props.theme.mainColor};
  ${styleMixin.flexBoxColumn}
`;
const FormPresenter = () => {
  /*handleForm = e => {
    e.preventDefault();
    const key = document.getElementById("key");
    const store = this.context;
    const {
      actions: { search }
    } = store;
    if (key.value !== "") {
      search(key.value);
      key.value = "";
    }
  };*/
  return (
    <Fragment>
      <Card onSubmit={this.handleForm}>
        <Input id="key" placeholder="일정 기록 검색" />
      </Card>
    </Fragment>
  );
};

export default FormPresenter;
