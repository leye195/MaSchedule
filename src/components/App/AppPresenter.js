import React, { Component, Fragment } from "react";
import Header from "../Header";
import Form from "../Form";
import Content from "../Content";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "../../theme";
const GlobalStyle = createGlobalStyle`
  body{
    margin:0;
    padding:0;
  }
  
  ul,li{
    list-style:none;
    padding:0px;
    margin:0px;
  }
`;
const Container = styled.div`
  height: ${(props) => props.theme.fullHeight};
  width: ${(props) => props.theme.fullWidth};
  background-color: #e3e3e3;
`;
const AppPresenter = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Form />
          <Content />
        </Container>
      </ThemeProvider>
    </Fragment>
  );
};

export default AppPresenter;
