import React, {createContext, useContext, useEffect, useReducer} from 'react';
import Card from './card';
import {withStyles} from "@material-ui/core";
import dummy from "./dummy";
import {GameContextProvider, getGameState} from "./context/game-context";
import Board from './board';
import CARD_STATE from './card-state';
import {areAllCardsFaceUp} from "./utils";
import {SET_CARDS} from "./actions";

const style = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 20%)',
    gridTemplateRows: 'repeat(2, 50%)',
    width: '80%',
    height: '65%'
  }
};

const GameDispatchContext = createContext();

const GameDispatchContextProvider = ({children, dispatch}) => (
  <GameDispatchContext.Provider value={dispatch}>
    {children}
  </GameDispatchContext.Provider>
);

export const getGameDispatchContext = () => useContext(GameDispatchContext);

const Index = withStyles(style)(({classes}) => {

  const {state, dispatch} = getGameState();

  useEffect(() => {
    console.log("Game has started");
  }, []);

  if (areAllCardsFaceUp(state.cards)) {
    //setTimeout(() => {dispatch({type: 'CARDS_DOWN'})}, 1500)
  }

  console.log("IM AN ASSHOLE");
  return (
    <div className={classes.root}>
      <GameDispatchContextProvider dispatch={dispatch}>
        <Board data={dummy()}/>
      </GameDispatchContextProvider>
    </div>
  )
});

export default () =>  (
  <GameContextProvider>
    <Index/>
  </GameContextProvider>
)