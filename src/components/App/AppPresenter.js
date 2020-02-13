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
  height: ${props => props.theme.fullHeight};
  width: ${props => props.theme.fullWidth};
  background-color: #e3e3e3;
`;
class AppPresenter extends Component {
  render() {
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
  }
}

/*
const Button = styled.button`
  border-radius: 50px;
  padding: 10px;
  min-width: 120px;
  color: white;
  font-weight: 600;
  -webkit-appearance: none;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "crimson" : "blue")};
  ${props => {
    if (props) {
      return css`
        animation: ${scale} 1s ease-out;
      `;
    }
  }}
`;
const Anchor = styled(Button.withComponent("a"))`
  text-decoration: none;
  font-size: 0.75rem;
`;
const scale = keyframes`
  from{
    transform:scale(0);
  }to{
    transform:scale(1);
  }
`;*/
export default AppPresenter;
