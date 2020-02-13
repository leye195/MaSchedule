import React, { Component, createContext } from "react";
const Context = createContext();
const { Provider, Consumer: DetailConsumer } = Context;

class DetailProvider extends Component {
  _detailOpen = () => {
    this.setState({
      isDetailOpen: true
    });
  };
  _detailClose = () => {
    this.setState({
      isDetailOpen: false
    });
  };
  _setEdit = flag => {
    this.setState({
      edit: flag
    });
  };
  state = {
    id: "",
    title: "",
    time: "",
    detail: "",
    isDetailOpen: false,
    edit: false
  };
  actions = {
    setInfo: schedule => {
      this.setState({
        id: schedule.id,
        title: schedule.title,
        time: schedule.time,
        detail: schedule.detail
      });
    },
    detailOpen: this._detailOpen,
    detailClose: this._detailClose,
    setEdit: this._setEdit
  };
  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { DetailProvider, DetailConsumer };
