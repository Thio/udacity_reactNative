export const ADD_DECK = "ADD_DECK";
export const ADD_QUESTION = "ADD_QUESTION";

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function addQuestion(title, question) {
  return {
    type: ADD_QUESTION,
    payload: { title, question }
  };
}
