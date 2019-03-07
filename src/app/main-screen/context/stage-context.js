import {createContext, useContext} from "react";
import React from "react";

export const STAGE = {
  START: 'start',
  GAME: 'game',
  SUMMARY: 'summary'
};

export const StageContext = createContext();
export const StageContextProvider = ({children, setStage}) => (
  <StageContext.Provider value={setStage}>
    {children}
  </StageContext.Provider>
);


export const getSetStage = () => useContext(StageContext);