import React, {createContext, useContext, useReducer} from "react";
import {
  addCard, allCardsFaceDown,
  allCardsFaceUp,
  areCardsLoaded,
  excludeCardsPredicate,
  filterCardPrdecitacte,
  loadedToTrueAndReturn
} from "../utils";
import GAME_STATE from "../game-state";
import {CARD_CLICK, CARD_LOADED, CARDS_DOWN, SET_CARDS} from "../actions";
import CARD_STATE from "../card-state";

const initialState = {
  cards: [],
  state: GAME_STATE.STARTING
};

const reducer = (state, action) => {
  const newState = {...state};

  switch (action.type) {
    case CARD_LOADED: {
      console.log("Dispatch: " + CARD_LOADED)
      const card = loadedToTrueAndReturn(state.cards, filterCardPrdecitacte(action.id));
      newState.cards = addCard(state.cards, card, excludeCardsPredicate(action.id))

      if(areCardsLoaded(newState.cards)) {
        newState.cards = allCardsFaceUp(newState.cards);
      }
      return newState;
    }
    case SET_CARDS: {
      newState.cards = action
        .cards
        .sort((a, b) => a.order > b.order ? -1 : 1);
      debugger;
      return newState;
    }
    case CARDS_DOWN: {
      newState.cards = allCardsFaceDown(state.cards);
      newState.state = GAME_STATE.RUNNING;
      return newState;
    }
    case CARD_CLICK: {
      newState.cards = [...state.cards.filter(card => card.id !== action.id), {...state.cards.filter(card => card.id === action.id)[0], state: CARD_STATE.FACE_UP}]
      debugger;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export const GameContext = createContext();

export const GameContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return  (
    <GameContext.Provider value={{state, dispatch}}>
      {children}
    </GameContext.Provider>
  )
};

export const getGameState = () => useContext(GameContext);