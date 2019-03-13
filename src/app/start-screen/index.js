import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/es/Card/Card";
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {getGlobalState} from "../../context/global-context";
import {getSetStage, STAGE} from "../constants/stage";
import {CARDS_DATA_RECIVED, CHANGE_STAGE, ON_CHANGE, SUBMIT} from "../../actions";
import { shadows } from '@material-ui/system';


const style = {
  root: {
    height: '300px',
    width: '600px',
    backgroundColor: '#fefefe',
    boxShadow: '5px 9px 3px 0px rgba(0,0,0,0.2), 11px 9px 1px 0px rgba(0,0,0,0.14), 8px 9px 1px -1px rgba(0,0,0,0.12)'
    //boxShadow: '0px 0px 240px 24px rgba(220,222,185,1)'
  }
};



const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

const formattedKeyword = (keyword) => {
  return keyword.replace(" ", "+");
};

const apiKey = "5c902b45955a07ade0a24495f1972c8b4549ff10b50a3a52ebcc887f16ec11c2";
const nCards = 5;

const retrieveFromApi = async (keyword) => {
  const keywords = formattedKeyword(keyword);
  return fetch(`https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${keywords}`)
    .then(res => res.json())
    .then(data =>
      data.results
        .slice(0, nCards)
        .map((result, index) =>
          ([{
            id: result.id,
            url: result.urls.regular,
            order: randomBetween(1, 1000),
            pair: index
          }, {
            id: `${result.id}-copy`,
            url: result.urls.regular,
            order: randomBetween(1, 1000),
            pair: index
          }]))
        .reduce((prev, current) => [...prev, ...current])
    )};

const initialState = {
  text: ""
};

export default withStyles(style)(({classes}) => {

  const [state, setState] = useState(initialState);
  const {dispatchGlobal} = getGlobalState();

  const submit = () => retrieveFromApi(state.text).then(data => {
    dispatchGlobal({type: CARDS_DATA_RECIVED, data});
    dispatchGlobal({type: CHANGE_STAGE, stage: STAGE.GAME})
  });

  return (
    <Card className={classes.root}>
      <TextField
        value={state.text}
        onChange={e => setState({text: e.currentTarget.value})}/>
      <Button onClick={submit}>Submit</Button>
    </Card>
  )
})