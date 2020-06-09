import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useReducer,
} from "react";
import moment from "moment";
//import data from "../fakeData";
const Context = createContext(); // Context 를 만듭니다;
const { Provider, Consumer: ScheduleConsumer } = Context;
const SCHEDULE = "SCHEDULE";
export const CALENDER_NOW = "CALENDER_NOW";
export const CALENDER_NEXT = "CALENDER_NEXT";
export const CALENDER_PREV = "CALENDER_PREV";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SELECT_DATE = "SELECT_DATE";
export const SET_SCHEDULE = "SET_SCHEDULE";
export const ADD_SCHEDULE = "ADD_SCHEDULE";
export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
export const EDIT_SCHEDULE = "EDIT_SCHEDULE";
export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const OPEN_NOTICE = "OPEN_NOTICE";
export const CLOSE_NOTICE = "CLOSE_NOTICE";
const loadData = () => {
  const local = localStorage.getItem(SCHEDULE);
  if (local !== null) {
    return JSON.parse(local);
  }
  return {};
};
const saveData = (toDos) => {
  localStorage.setItem(SCHEDULE, JSON.stringify(toDos));
};
const initState = {
  toDos: loadData(),
  today: moment(),
  moment: moment(),
  selected: moment(),
  isMadalOpen: false,
  notice: 0,
  isOpen: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "CALENDER_NOW":
      return {
        ...state,
        moment: moment(),
      };
    case "CALENDER_NEXT":
      return {
        ...state,
        moment: state.moment.add(1, "month"),
      };
    case "CALENDER_PREV":
      return {
        ...state,
        moment: state.moment.subtract(1, "month"),
      };
    case "OPEN_MODAL":
      return {
        ...state,
        isMadalOpen: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isMadalOpen: false,
      };
    case "SELECT_DATE":
      return {
        ...state,
        selected: moment(`${action.payload.date}`),
      };
    case "SET_SCHEDULE":
      return {
        ...state,
        toDos: JSON.stringify(action.payload.len),
      };
    case "ADD_SCHEDULE":
      console.log(state.toDos[action.payload.date]);
      if (state.toDos[action.payload.date] !== undefined) {
        return {
          ...state,
          toDos: {
            ...state.toDos,
            [action.payload.date]: [
              ...state.toDos[action.payload.date],
              action.payload.toDo,
            ],
          },
        };
      } else {
        return {
          ...state,
          toDos: {
            ...state.toDos,
            [action.payload.date]: [action.payload.toDo],
          },
        };
      }
    case "DELETE_SCHEDULE":
      const filteredSchedule = state.toDos[action.payload.date].filter(
        (todo) => todo.id !== action.payload.id
      );
      saveData({ ...state.toDos, [action.payload.date]: filteredSchedule });
      return {
        ...state,
        toDos: { ...state.toDos, [action.payload.date]: filteredSchedule },
      };
    case "EDIT_SCHEDULE":
      const { id, title, time, detail } = action.payload.info;
      const filtered = state.toDos[action.payload.date].filter(
        (item) => item.id !== id
      );
      const newOne = state.toDos[action.payload.date].filter(
        (item) => item.id === id
      );
      newOne.title = title;
      newOne.time = time;
      newOne.detail = detail;
      saveData({
        ...state.toDos,
        [action.payload.date]: [...filtered, newOne],
      });
      return {
        ...state,
        toDos: {
          ...state.toDos,
          [action.payload.date]: [...filtered, newOne],
        },
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notice: action.payload.cnt,
      };
    case "OPEN_NOTICE":
      return {
        ...state,
        isOpen: true,
        notice: 0,
      };
    case "CLOSE_NOTICE":
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}

const ScheduleProvider = ({ children }) => {
  //const value = { schedule, actions };
  const [state, dispatch] = useReducer(reducer, initState);
  //-> put {state,dispath} into value of Provider
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
const useSchedule = () => {
  const { state, dispatch } = useContext(Context);
  return { state, dispatch };
};
export { ScheduleProvider, ScheduleConsumer, useSchedule };
