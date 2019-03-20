import React, { useState} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import {getGlobalState} from "../../context/global-context";
import {STAGE} from "../constants/stage";
import {CARDS_DATA_RECIVED, CHANGE_STAGE, } from "../../actions";
import retrieveDataFromApi from "./retriveDataFromApi"
import Display from "../components/Display";


export default props => {

  const [text, setText] = useState("");
  const {dispatchGlobal} = getGlobalState();

  const submit = () => retrieveDataFromApi(text).then(data => {
    dispatchGlobal({type: CARDS_DATA_RECIVED, data});
    dispatchGlobal({type: CHANGE_STAGE, stage: STAGE.GAME})
  });

  return (
    <Display title={"CARTIMAGIUS"} onClick={submit} disabled={!text} btnText={"SUBMIT"}>
      <TextField
        value={text}
        onChange={e => setText(e.currentTarget.value)}/>
    </Display>
  )
}