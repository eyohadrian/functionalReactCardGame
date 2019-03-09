import React, {createContext, useContext, useReducer} from "react";
import {CARDS_DATA_RECIVED, GAME_FINISHED, GAME_STARTS } from "../actions";
import {now} from "../main-screen/utils";

const initialState = {
  cardRawData: undefined,
  gameStartsAt: undefined,
  time: undefined,
  gameFinished: false,
};

const reducer = (state, action) => {
  const newState = {...state};
  switch (action.type) {
    case CARDS_DATA_RECIVED: {
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
  const [globalState, dispatchGlobal] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{globalState, dispatchGlobal}}>
      {children}
    </GlobalContext.Provider>
  )
};

export const getGlobalState = () => useContext(GlobalContext);

