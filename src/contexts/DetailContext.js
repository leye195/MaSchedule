import React, { createContext, useContext } from "react";
import { useState } from "react";
const Context = createContext();
const { Provider, Consumer: DetailConsumer } = Context;

const DetailProvider = ({ children }) => {
  const [details, setDetail] = useState({
    id: "",
    title: "",
    time: "",
    detail: "",
    isDetailOpen: false,
    edit: false,
  });
  const _detailOpen = () => {
    setDetail({
      ...details,
      isDetailOpen: true,
    });
  };
  const _detailClose = () => {
    setDetail({
      ...details,
      isDetailOpen: false,
    });
  };
  const _setEdit = (flag) => {
    setDetail({
      ...details,
      edit: flag,
    });
  };
  const actions = {
    setInfo: (schedule) => {
      setDetail({
        id: schedule.id,
        title: schedule.title,
        time: schedule.time,
        detail: schedule.detail,
        isDetailOpen: false,
        edit: false,
      });
    },
    detailOpen: _detailOpen,
    detailClose: _detailClose,
    setEdit: _setEdit,
  };
  //const { state, actions } = this;
  const value = { details, actions };
  return <Provider value={value}>{children}</Provider>;
};
const useDetail = () => {
  const { details, actions } = useContext(Context);
  return { details, actions };
};
export { DetailProvider, DetailConsumer, useDetail };
