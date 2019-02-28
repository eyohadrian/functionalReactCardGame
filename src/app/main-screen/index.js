import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {getGlobalState} from "../context/global-context";
import Card from './card';
import {withStyles} from "@material-ui/core";
import dummy from "./dummy";


const initialState = {
  cardsLoaded: 0,
  cardsFaceDown: true,
};

const reducer = (state, action) => {
  const newState = {...state};

  switch (action.type) {
    case 'cardLoaded': {
      newState.cardsLoaded = state.cardsLoaded + 1;
      newState.cardsFaceDown = newState.cardsLoaded < 10;
      return newState;
    } default: {
      return newState;
    }
  }
};

const style = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 20%)',
    gridTemplateRows: 'repeat(2, 50%)',
    width: '80%',
    height: '65%'
  }
};


export default withStyles(style)(({classes}) => {

  useEffect(() => {
    console.log("Rendered main-screen")
  });

  const [localState, dispatchLocal] = useReducer(reducer, initialState);
  if(!localState.cardsFaceDown) {
    console.log("Completed");
    debugger;
  }

  const {globalState, dispatchGlobal} = getGlobalState();

  return (
    <div className={classes.root}>
      {dummy().map(data => <Card data={data} key={data.id} onLoad={() => dispatchLocal({type: 'cardLoaded'})} />)}
    </div>
  )
})