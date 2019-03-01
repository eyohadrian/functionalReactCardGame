import React, {createContext, useContext, useReducer} from "react";
import CARD_STATE from "../card-state";

const initialState = {
  cardsLoaded: 0,
  cardsFaceDown: true,
  cards: []
};


const reducer = (state, action) => {
  const newState = {...state};

  switch (action.type) {
    case 'cardLoaded': {
      newState.cardsLoaded = state.cardsLoaded + 1;
      newState.cardsFaceDown = newState.cardsLoaded < 10;

      const card = {...state.cards.find(card => card.id === action.id), loaded: true};
      newState.cards = [...state.cards.filter(card => card.id !== action.id), card];

      if(newState.cards.every(card => card.loaded === true)) {
        newState.cards = newState.cards.map(card => ({...card, state: CARD_STATE.FACE_UP}))
      }

      return newState;
    }
    case 'set_cards': {
      newState.cards = action.cards;
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