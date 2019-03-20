import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/es/Card/Card";
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {getGlobalState} from "../../context/global-context";
import {STAGE} from "../constants/stage";
import {CARDS_DATA_RECIVED, CHANGE_STAGE, } from "../../actions";
import retrieveDataFromApi from "./retriveDataFromApi"


const style = {
  root: {
    height: '300px',
    width: '600px',
    backgroundColor: '#fefefe',
    boxShadow: '5px 9px 3px 0px rgba(0,0,0,0.2), 11px 9px 1px 0px rgba(0,0,0,0.14), 11px 16px 1px -1px rgba(0,0,0,0.12)',
    display: 'grid',
    gridTemplateColumns: '16% auto 16%',
    gridTemplateRows: '16% auto 16%'
  },
  content: {
    gridColumn: '2/3',
    gridRow: '2/3',
    display: 'grid',
    gridTemplateRows: '32% 32% 32%',
    gridRowGap: '4%'
  },
  title: {
    fontFamily: 'fantasy',
    margin: 0,
    alignSelf: 'center',
    justifySelf: 'center',
    fontSize: '32px',
    fontWeight: '900',
    color: '#2e2c2f',
    textShadow: '2px 2px #6200ff4f'
  },
  button: {
    fontSize: '24px',
    background: 'linear-gradient(to right, #30CFD0 0%, #330867 100%)',
    '&:hover': {
      background: 'linear-gradient(to left, #30CFD0 0%, #330867 100%)',
      color:'white'
    }
  }
};


export default withStyles(style)(({classes}) => {

  const [text, setText] = useState("");
  const {dispatchGlobal} = getGlobalState();

  const submit = () => retrieveDataFromApi(text).then(data => {
    dispatchGlobal({type: CARDS_DATA_RECIVED, data});
    dispatchGlobal({type: CHANGE_STAGE, stage: STAGE.GAME})
  });

  return (
    <Card className={classes.root}>
      <div className={classes.content}>
        <h3 className={classes.title}>CARTIMAGIUS</h3>
        <TextField
          value={text}
          onChange={e => setText(e.currentTarget.value)}/>
        <Button onClick={submit} disabled={!text} className={classes.button}>Submit</Button>
      </div>
    </Card>
  )
})