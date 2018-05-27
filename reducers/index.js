import { ADD_DECK, ADD_QUESTION } from "../actions";

const emptyDeck = {
  deckName: "",
  cards: []
};

const defaultState = {
  decks: [
    {
      deckName: "Test",
      cards: [
        {
          q: "whats your name?",
          a: "matthias"
        },
        {
          q: "how old are you",
          a: "28"
        }
      ]
    },
    {
      deckName: "idoten",
      cards: [
        {
          q: "whats your cats name?",
          a: "isis"
        },
        {
          q: "where do you live",
          a: "regensburg"
        }
      ]
    }
  ]
};

function entries(state = defaultState, action) {
  switch (action.type) {
    case ADD_DECK:
      let deck = Object.assign({}, emptyDeck);
      deck.deckName = action.deck;
      return {
        decks: state.decks.concat(deck)
      };
    case ADD_QUESTION:
      return {
        decks: state.decks.map(deck => {
          if (deck.deckName === action.payload.title) {
            deck.cards.push(action.payload.question);
          }
          return deck;
        })
      };
    default:
      return state;
  }
}

export default entries;
