import CARD_STATE from "../constants/card-state";

export const allCardsFaceUp = cards => cards.map(card => ({...card, state: CARD_STATE.FACE_UP}));
export const allCardsFaceDown = cards => cards.map(card => ({...card, state: CARD_STATE.FACE_DOWN}));
export const cardsWithPairNotFoundFaceDown = cards => [...allCardsFaceDown(findCardsWithPairNotFound(cards)), ...findCardsWithPairFound(cards)]
export const filterCardPrdecitacte = id => card => card.id === id;
export const excludeCardsPredicate = id => card => card.id !== id;
export const loadedToTrueAndReturn = (cards,predicate) => ({...cards.find(predicate), loaded: true});
export const addCard = (cards, card, predicate) => [...cards.filter(predicate), card];


export const areCardsLoaded = cards => cards.every(card => card.loaded === true);
export const areAllCardsFaceUp = cards => cards.every(card => card.state === CARD_STATE.FACE_UP);


const findCardsFaced = state => cards => cards.filter(card => card.state === state);
export const findCardsFacedUp = findCardsFaced(CARD_STATE.FACE_UP);
export const findCardsFacedDown = findCardsFaced(CARD_STATE.FACE_DOWN);
export const findCardsWithPairFound = cards => cards.filter(card => card.hasFindItsPair);
export const findCardsWithPairNotFound = cards => cards.filter(card => !card.hasFindItsPair)


export const formattedTime = milis => {
  const time = new Date(milis);
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const mili = time.getMilliseconds();
  return `${minutes} minutes,  ${seconds} seconds, ${mili} miliseconds`
};

export const now = () => new Date().getTime();