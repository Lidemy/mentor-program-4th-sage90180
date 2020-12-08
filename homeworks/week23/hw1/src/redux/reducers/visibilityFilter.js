import { SET_FILTER } from "../actionTypes";

const initialState = "all";

export default function visibilityFilter(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
}
