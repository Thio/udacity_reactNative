import { ADD_DECK, ADD_QUESTION } from "../actions";

const emptyDeck = {
  deckName: "",
  cards: []
};

const defaultState = {
  decks: [
    {
      deckName: "Mentorquestion",
      cards: [
        {
          q: "Was i a good mentor?",
          a: "yes"
        },
        {
          q: "Is my student sorry for missing the deadline",
          a: "yes"
        },
        {
          q: "Is the student going to pass",
          a: "i dont know yet"
        }
      ]
    },
    {
      deckName: "stupid facts",
      cards: [
        {
          q: "what was walt disney afraid of?",
          a: "mice"
        },
        {
          q: "what animal can breath through the butt",
          a: "turtle"
        },
        {
          q: "what planet rotates clockwise",
          a: "venus"
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
