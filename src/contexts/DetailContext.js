import React, { createContext, useContext, useReducer } from "react";
const Context = createContext();
const { Provider, Consumer: DetailConsumer } = Context;
export const DETAIL_OPEN = "DETAIL_OPEN";
export const DETAIL_CLOSE = "DETAIL_CLOSE";
export const SET_EDIT = "SET_EDIT";
export const SET_DETAIL = "SET_DETAIL";

const initState = {
  id: "",
  title: "",
  time: "",
  detail: "",
  isDetailOpen: false,
  edit: false,
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case DETAIL_OPEN:
      return {
        ...state,
        isDetailOpen: true,
      };
    case DETAIL_CLOSE:
      return {
        ...state,
        isDetailOpen: false,
      };
    case SET_EDIT:
      return {
        ...state,
        edit: action.payload.flag,
      };
    case SET_DETAIL:
      return {
        ...state,
        id: payload.schedule.id,
        title: payload.schedule.title,
        time: payload.schedule.time,
        detail: payload.schedule.detail,
      };
    default:
      return state;
  }
};

const DetailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
const useDetail = () => {
  const { state, dispatch } = useContext(Context);
  return { state, dispatch };
};
export { DetailProvider, DetailConsumer, useDetail };
