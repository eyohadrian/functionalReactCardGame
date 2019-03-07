import React, {createContext, useContext, useReducer} from "react";
import {GAME_FINISHED} from "../actions";

const initialState = {
  text: "",
  send: false,
  cardRawData: undefined,
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

