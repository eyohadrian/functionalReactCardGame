import React, { useEffect } from "react";
import Card from "@material-ui/core/es/Card/Card";
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {getGlobalState} from "../context/global-context";
import {getSetStage, STAGE} from "../main-screen/context/stage-context";
import {CARDS_DATA_RECIVED, ON_CHANGE, SUBMIT} from "../actions";

const style = {
  root: {
    height: '300px',
    width: '600px'
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

export default withStyles(style)(({classes}) => {
  const setStage = getSetStage();
  useEffect(() => {
    console.log("Rendered start-screen")
  });

  const {globalState, dispatchGlobal} = getGlobalState();

  if(globalState.send) {
    retrieveFromApi(globalState.text).then(data => {
      console.log(data);
      dispatchGlobal({type: CARDS_DATA_RECIVED, data})
      setStage(STAGE.GAME);
    });
  }

  return (
    <Card className={classes.root}>
      <TextField
        value={globalState.text}
        onChange={e => dispatchGlobal({type: ON_CHANGE, value: e.currentTarget.value})}/>
      <Button onClick={() => dispatchGlobal({type: SUBMIT})}>Submit</Button>
    </Card>
  )
})