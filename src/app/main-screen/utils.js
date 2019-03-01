import CARD_STATE from "./card-state";

export const allCardsFaceUp = cards => cards.map(card => ({...card, state: CARD_STATE.FACE_UP}));
export const allCardsFaceDown = cards => cards.map(card => ({...card, state: CARD_STATE.FACE_DOWN}));
export const filterCardPrdecitacte = id => card => card.id === id;
export const excludeCardsPredicate = id => card => card.id !== id;
export const loadedToTrueAndReturn = (cards,predicate) => ({...cards.find(predicate), loaded: true});
export const addCard = (cards, card, predicate) => [...cards.filter(predicate), card];


export const areCardsLoaded = cards => cards.every(card => card.loaded === true);
export const areAllCardsFaceUp = cards => cards.every(card => card.state === CARD_STATE.FACE_UP);
