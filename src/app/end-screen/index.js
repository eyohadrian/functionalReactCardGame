import React from 'react';
import {formattedTime} from "../main-screen/utils";
import {STAGE} from "../constants/stage";
import {getGlobalState} from "../../context/global-context";
import {CHANGE_STAGE} from "../../actions";
import Display from "../components/Display";
import Time from "../components/Time";



export default props => {
  const {globalState, dispatchGlobal} = getGlobalState();
  const time = formattedTime(globalState.time);
  return (
    <Display
      title={"END"}
      onClick={() => dispatchGlobal({type: CHANGE_STAGE, stage: STAGE.START})}
      btnText={"Play Again"}>
        <Time time={time}/>
    </Display>
  )
}
