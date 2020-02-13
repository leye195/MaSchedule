import styled, { css } from "styled-components";

const awesomeCard = css`
  box-shadow: 0 4px 5px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  border-radius: 5px;
  padding: 10px;
`;
const flexBoxColumn = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const flexBoxRow = css`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const shadowBox = css`
  box-shadow: 0 4px 5px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 5px;
`;
const noticeliStyle = css`
  list-style: none;
  padding: 5px;
  margin: 10px;
`;
const style = {
  awesomeCard,
  flexBoxColumn,
  flexBoxRow,
  shadowBox,
  noticeliStyle
};
export default style;
