import React, { createContext, useState, useCallback, useContext } from "react";
import moment from "moment";
//import data from "../fakeData";
const Context = createContext(); // Context 를 만듭니다;
const { Provider, Consumer: ScheduleConsumer } = Context;
const SCHEDULE = "SCHEDULE";

const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState({
    toDos: [],
    today: moment(),
    moment: moment(),
    selected: moment(),
    isMadalOpen: false,
    notice: 0,
    isOpen: false,
  });
  const loadData = useCallback(() => {
    const local = localStorage.getItem(SCHEDULE);
    if (local !== null) {
      setSchedule({ ...schedule, toDos: JSON.parse(local) });
    }
  }, [schedule]);
  const _calenderNow = () => {
    setSchedule({
      ...schedule,
      moment: moment(),
    });
  };
  const _calenderNext = () => {
    setSchedule({
      ...schedule,
      moment: schedule.moment.add(1, "month"),
    });
  };
  const _calenderPrev = () => {
    setSchedule({
      ...schedule,
      moment: schedule.moment.subtract(1, "month"),
    });
  };
  const _selectDate = (date) => {
    console.log(date);
    setSchedule({
      ...schedule,
      selected: moment(`${date}`),
    });
  };
  const _openModal = () => {
    setSchedule({
      ...schedule,
      isMadalOpen: true,
    });
  };
  const _closeModal = () => {
    setSchedule({
      ...schedule,
      isMadalOpen: false,
    });
  };
  const _setSchedule = (data) => {
    //console.log(data);
    setSchedule({
      ...schedule,
      toDos: JSON.stringify(data),
    });
    //console.log(this.state.toDos);
  };
  const _addSchedule = () => {
    const toDos = loadData();
    setSchedule({
      ...schedule,
      toDos,
    });
  };
  const _deleteSchedule = (date, id) => {
    const newState = schedule.toDos[date].filter((todo) => todo.id !== id);
    //console.log(newState);
    setSchedule({
      ...schedule,
      toDos: {
        ...schedule.toDos,
        [date]: newState,
      },
    });
  };
  const _setNotification = (cnt) => {
    setSchedule({
      ...schedule,
      notice: cnt,
    });
  };
  const _openNotice = () => {
    setSchedule({
      ...schedule,
      isOpen: true,
      notice: 0,
    });
  };
  const _closeNotice = () => {
    setSchedule({
      ...schedule,
      isOpen: false,
    });
  };
  const _editSchedule = (date, info) => {
    const { id, title, time, detail } = info;
    const tmp = schedule.toDos[date].filter((item) => item.id !== id);
    const newOne = schedule.toDos[date].filter((item) => item.id === id);
    newOne.title = title;
    newOne.time = time;
    newOne.detail = detail;
    //console.log(target);
    setSchedule({
      ...schedule,
      toDos: {
        ...this.state.toDos,
        [date]: [...tmp, newOne],
      },
    });
  };
  const _search = (keyword) => {
    const { toDos } = schedule;
    const result = [];
    Object.keys(toDos).forEach((item) => {
      const cur = toDos[item];
      for (let i = 0; i < cur.length; i++) {
        if (cur[i].title.includes(keyword)) result.push(cur[i]);
      }
    });
    //console.log(result);
    //검색 결과 처리 예정
  };
  const actions = {
    loadData,
    calenderNow: _calenderNow,
    calenderNext: _calenderNext,
    calenderPrev: _calenderPrev,
    modalOpen: _openModal,
    modalClose: _closeModal,
    setData: _setSchedule,
    addTodo: _addSchedule,
    deleteTodo: _deleteSchedule,
    editTodo: _editSchedule,
    selectDate: _selectDate,
    openNotice: _openNotice,
    closeNotice: _closeNotice,
    setNotification: _setNotification,
    search: _search,
  };
  const value = { schedule, actions };
  return <Provider value={value}>{children}</Provider>;
};
const useSchedule = () => {
  const { schedule, actions } = useContext(Context);
  return { schedule, actions };
};
export { ScheduleProvider, ScheduleConsumer, useSchedule };
