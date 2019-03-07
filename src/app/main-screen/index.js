import React, {createContext, useContext, useEffect, useReducer} from 'react';
import Card from './card';
import {withStyles} from "@material-ui/core";
import dummy from "./dummy";
import {GameContextProvider, getGameState} from "./context/game-context";
import Board from './board';
import CARD_STATE from './card-state';
import {areAllCardsFaceUp, now} from "./utils";
import {CARDS_DOWN, SET_CARDS} from "./actions";
import GAME_STATE from "./game-state";
import {getGlobalState} from "../context/global-context";
import {GAME_FINISHED, GAME_STARTS} from "../actions";
import {getSetStage, STAGE} from "./context/stage-context";

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

  const {globalState, dispatchGlobal} = getGlobalState();
  const {state, dispatch} = getGameState();
  const setStage = getSetStage();
  useEffect(() => {
    console.log("Game has started");
    dispatchGlobal({type: GAME_STARTS, time: now()})
    const cards = globalState.cardRawData.map(data => ({
      id: data.id,
      url: data.url,
      loaded: false,
      state: CARD_STATE.FACE_DOWN,
      order: data.order,
      pair: data.pair,
      hasFindItsPair: false
    }));
    dispatch({type: SET_CARDS, cards})

  }, []);


  useEffect(() => {

    if (areAllCardsFaceUp(state.cards) && state.state === GAME_STATE.STARTING) {
      setTimeout(() => dispatch({type: CARDS_DOWN}), 1500)
    }

    if (state.state === GAME_STATE.FREEZED) {
      setTimeout(() => dispatch({type: CARDS_DOWN}), 1000)
    }

    if (state.state === GAME_STATE.FINISHED) {
      setTimeout(() => dispatchGlobal({type: GAME_FINISHED}), 1000)
      setStage(STAGE.SUMMARY);
    }
  }, [state.state]);

  return (
    <div className={classes.root}>
        {state.cards.length > 0 && <Board data={state.cards}/>}
    </div>
  )
});

export default () =>  (
  <GameContextProvider>
    <Index/>
  </GameContextProvider>
)