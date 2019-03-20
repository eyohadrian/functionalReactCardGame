import React from 'react';
import {STAGE} from "../constants/stage";
import {getGlobalState} from "../../context/global-context";
import {CHANGE_STAGE} from "../../actions";
import Display from "../components/Display";
import Time from "../components/Time";



export default props => {
  const {globalState, dispatchGlobal} = getGlobalState();
  return (
    <Display
      title={"END"}
      onClick={() => dispatchGlobal({type: CHANGE_STAGE, stage: STAGE.START})}
      btnText={"Play Again"}>
        <Time time={globalState.time}/>
    </Display>
  )
}
