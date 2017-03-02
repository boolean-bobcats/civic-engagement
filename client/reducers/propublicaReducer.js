export default function search(state = {}, action) {
  switch (action.type) {
    case 'Politician_Search_bio': {
      const { name, bio } = action.payload.data;
      if (state[name]) Object.assign(bio, state[name]);

      return { ...state, [name]: bio };
    }
    case 'Politician_Search_bills_sponsored': {
      const { name, bills } = action.payload.data;
      if (state[name]) Object.assign(bills, state[name]);

      return { ...state, [name]: bills };
    }
    case 'Politician_Search_voting_record': {
      const { name, votes } = action.payload.data;
      if (state[name]) Object.assign(votes, state[name]);

      return { ...state, [name]: votes };
    }
    case 'Top20_Search': {
      return { ...state, Top20: action.payload.data };
    }
    default:
      return state;
  }
}
