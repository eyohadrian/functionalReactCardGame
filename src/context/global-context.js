import React, {createContext, useContext, useReducer} from "react";
import {CARDS_DATA_RECIVED, CHANGE_STAGE, GAME_FINISHED, GAME_STARTS} from "../actions";
import {now} from "../app/main-screen/utils";
import {STAGE} from "../app/constants/stage";

const initialState = {
  cardRawData: undefined,
  gameStartsAt: undefined,
  time: undefined,
  gameFinished: false,
  stage: STAGE.START
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
      newState.time = now() - state.gameStartsAt;
      return newState;
    }
    case GAME_STARTS: {
      newState.gameStartsAt = action.time;
      return newState;
    }
    case CHANGE_STAGE: {
      newState.stage = action.stage;
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

