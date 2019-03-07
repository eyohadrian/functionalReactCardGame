import React, {createContext, useContext, useReducer} from "react";
import {
  addCard, allCardsFaceDown,
  allCardsFaceUp,
  areCardsLoaded, cardsWithPairNotFoundFaceDown,
  excludeCardsPredicate,
  filterCardPrdecitacte, findCardsFacedDown, findCardsFacedUp, findCardsWithPairFound, findCardsWithPairNotFound,
  loadedToTrueAndReturn
} from "../utils";
import GAME_STATE from "../game-state";
import {CARD_CLICK, CARD_LOADED, CARDS_DOWN, SET_CARDS} from "../actions";
import CARD_STATE from "../card-state";

const initialState = {
  cards: [],
  state: GAME_STATE.STARTING,
  cardsFacedSameTime: 2
};

const reducer = (state, action) => {
  const newState = {...state};

  switch (action.type) {
    case CARD_LOADED: {
      const card = loadedToTrueAndReturn(state.cards, filterCardPrdecitacte(action.id));
      newState.cards = addCard(state.cards, card, excludeCardsPredicate(action.id))

      if(areCardsLoaded(newState.cards)) {
        newState.cards = allCardsFaceUp(newState.cards);
      }

      return newState;
    }
    case SET_CARDS: {
      newState.cards = action.cards;
      return newState;
    }
    case CARDS_DOWN: {
      newState.cards = cardsWithPairNotFoundFaceDown(state.cards);
      newState.state = GAME_STATE.RUNNING;
      return newState;
    }
    case CARD_CLICK: {
      const card = {...state.cards.filter(card => card.id === action.id)[0], state: CARD_STATE.FACE_UP};
      newState.cards = [...state.cards.filter(card => card.id !== action.id), card];
      const cardsFacedUpWithoutPair = findCardsWithPairNotFound(findCardsFacedUp(newState.cards));

      if(cardsFacedUpWithoutPair.length === state.cardsFacedSameTime) {
        const arePair = newState.cards
          .filter(card => card.state === CARD_STATE.FACE_UP && !card.hasFindItsPair)
          .reduce((prev, current) => prev.pair === current.pair);

        arePair
          ? newState.cards = [...newState.cards.filter(card => card.state === CARD_STATE.FACE_DOWN || card.hasFindItsPair), ...cardsFacedUpWithoutPair.map(card => ({...card, hasFindItsPair: true}))]
          : newState.state = GAME_STATE.FREEZED

        if (newState.cards.every(card => card.hasFindItsPair)) {
          newState.state = GAME_STATE.FINISHED
        }
      }

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