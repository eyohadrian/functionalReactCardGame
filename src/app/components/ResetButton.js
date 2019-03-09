import {getSetStage, STAGE, StageContextProvider} from "../main-screen/context/stage-context";
import Button from "@material-ui/core/es/Button/Button";
import React from "react";
import {GameContextProvider} from "../main-screen/context/game-context";
import {GlobalContextProvider} from "../context/global-context";


const ResetButton = ({className}) => {
  const setStage = getSetStage();
  debugger;
  return (<Button className={className} onClick={() => setStage(STAGE.START)}>Play Again</Button>)
};

export default props => (
  <GlobalContextProvider>
    <GameContextProvider>
        <ResetButton {...props} />
    </GameContextProvider>
  </GlobalContextProvider>)