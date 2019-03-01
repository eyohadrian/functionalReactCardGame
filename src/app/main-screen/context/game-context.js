import React, {createContext, useContext, useReducer} from "react";
import CARD_STATE from "../card-state";

const initialState = {
  cards: []
};

const areCardsLoaded = cards => cards.every(card => card.loaded === true);
const allCardsFaceUp = cards => cards.map(card => ({...card, state: CARD_STATE.FACE_UP}));

const filterCardPrdecitacte = id => card => card.id === id;
const excludeCardsPredicate = id => card => card.id !== id;

const loadedToTrueAndReturn = (cards,predicate) => ({...cards.find(predicate), loaded: true});
const addCard = (cards, card, predicate) => [...cards.filter(predicate), card];

const reducer = (state, action) => {
  const newState = {...state};

  switch (action.type) {
    case 'cardLoaded': {

      const card = loadedToTrueAndReturn(state.cards, filterCardPrdecitacte(action.id));
      newState.cards = addCard(state.cards, card, excludeCardsPredicate(action.id))

      if(areCardsLoaded(newState.cards)) {
        newState.cards = allCardsFaceUp(newState.cards);
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