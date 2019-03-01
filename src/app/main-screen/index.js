import React, {useEffect, useReducer} from 'react';
import Card from './card';
import {withStyles} from "@material-ui/core";
import dummy from "./dummy";
import {GameContextProvider, getGameState} from "./context/game-context";
import Board from './board';
import CARD_STATE from './card-state';
import {areAllCardsFaceUp} from "./utils";

const style = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 20%)',
    gridTemplateRows: 'repeat(2, 50%)',
    width: '80%',
    height: '65%'
  }
};

const Index = withStyles(style)(({classes}) => {

  const {state, dispatch} = getGameState();

  useEffect(() => {
    console.log("Game has started");
    const cards = dummy().map(data => ({
      id: data.id,
      url: data.url,
      loaded: false,
      state: CARD_STATE.FACE_DOWN
    }));
    dispatch({type: 'SET_CARDS', cards})
  }, []);

  if (areAllCardsFaceUp(state.cards)) {
    setTimeout(() => {dispatch({type: 'CARDS_DOWN'})}, 1500)
  }

  return (
    <div className={classes.root}>
      {state.cards.length > 0 &&
        <Board data={state.cards}/>}
    </div>
  )
})

export default () =>  (
  <GameContextProvider>
    <Index/>
  </GameContextProvider>
)