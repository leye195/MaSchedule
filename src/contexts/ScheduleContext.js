import React, { Component, createContext } from "react";
import moment from "moment";
//import data from "../fakeData";
const Context = createContext(); // Context 를 만듭니다;
const { Provider, Consumer: ScheduleConsumer } = Context;
const SCHEDULE = "SCHEDULE";

class ScheduleProvider extends Component {
  loadData = () => {
    const local = localStorage.getItem(SCHEDULE);
    if (local !== null) {
      return JSON.parse(local);
    }
    return {};
  };
  _calenderNow = () => {
    this.setState({
      moment: moment(),
    });
  };
  _calenderNext = () => {
    this.setState({
      moment: this.state.moment.add(1, "month"),
    });
  };
  _calenderPrev = () => {
    this.setState({
      moment: this.state.moment.subtract(1, "month"),
    });
  };
  _selectDate = (date) => {
    this.setState({
      selected: moment(`${date}`),
    });
  };
  _openModal = () => {
    this.setState({
      isMadalOpen: true,
    });
  };
  _closeModal = () => {
    this.setState({
      isMadalOpen: false,
    });
  };
  _setSchedule = (data) => {
    //console.log(data);
    this.setState({
      toDos: JSON.stringify(data),
    });
    console.log(this.state.toDos);
  };
  _addSchedule = (todo, date) => {
    if (this.state.toDos[date] !== undefined) {
      const newState = this.state.toDos[date].concat([
        {
          id: moment().format("S"),
          title: todo[0],
          time: todo[1],
          detail: todo[2],
          done: false,
        },
      ]);
      this.setState({
        toDos: {
          ...this.state.toDos,
          [date]: newState,
          //newState
        },
      });
    } else {
      const newState = [
        {
          id: moment().format("S"),
          title: todo[0],
          time: todo[1],
          detail: todo[2],
          done: false,
        },
      ];
      this.setState({
        toDos: {
          ...this.state.toDos,
          [date]: newState,
        },
      });
    }
    //console.log(this.state.toDos);
  };
  _deleteSchedule = (date, id) => {
    const newState = this.state.toDos[date].filter((todo) => todo.id !== id);
    console.log(newState);
    this.setState({
      toDos: {
        ...this.state.toDos,
        [date]: newState,
      },
    });
  };
  _setNotification = (cnt) => {
    this.setState({
      notice: cnt,
    });
  };
  _openNotice = () => {
    this.setState({
      isOpen: true,
      notice: 0,
    });
  };
  _closeNotice = () => {
    this.setState({
      isOpen: false,
    });
  };
  _editSchedule = (date, info) => {
    const { id, title, time, detail } = info;
    const tmp = this.state.toDos[date].filter((item) => item.id !== id);
    const newOne = this.state.toDos[date].filter((item) => item.id === id);
    newOne.title = title;
    newOne.time = time;
    newOne.detail = detail;
    //console.log(target);
    this.setState({
      toDos: {
        ...this.state.toDos,
        [date]: [...tmp, newOne],
      },
    });
  };
  _search = (keyword) => {
    const { toDos } = this.state;
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
  state = {
    toDos: this.loadData(),
    today: moment(),
    moment: moment(),
    selected: moment(),
    isMadalOpen: false,
    notice: 0,
    isOpen: false,
  };
  actions = {
    calenderNow: this._calenderNow,
    calenderNext: this._calenderNext,
    calenderPrev: this._calenderPrev,
    modalOpen: this._openModal,
    modalClose: this._closeModal,
    setData: this._setSchedule,
    addTodo: this._addSchedule,
    deleteTodo: this._deleteSchedule,
    editTodo: this._editSchedule,
    selectDate: this._selectDate,
    openNotice: this._openNotice,
    closeNotice: this._closeNotice,
    setNotification: this._setNotification,
    search: this._search,
  };
  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { Context, ScheduleProvider, ScheduleConsumer };
