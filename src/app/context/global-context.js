import React, {createContext, useContext, useReducer} from "react";
import {GAME_FINISHED, GAME_STARTS} from "../actions";
import {now} from "../main-screen/utils";

const initialState = {
  text: "",
  send: false,
  cardRawData: undefined,
  gameStartsAt: undefined,
  time: undefined,
  gameFinished: false,
};

const reducer = (state, action) => {
  const newState = {...state};
  switch (action.type) {
    case 'onChange': {
      newState.text = action.value;
      return newState;
    }
    case 'submit': {
      newState.send = true;
      return newState;
    }
    case 'cardDataRecived': {
      newState.cardRawData = action.data;
      return newState;
    }
    case GAME_FINISHED: {
      newState.gameFinished = true;
      newState.time = now() - action.gameStartsAt;
      return newState;
    }
    case GAME_STARTS: {
      newState.gameStartsAt = action.time;
      return newState;
    }
    default: {
      return newState;
    }
  }

};

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
};

export const getGlobalState = () => useContext(GlobalContext);

