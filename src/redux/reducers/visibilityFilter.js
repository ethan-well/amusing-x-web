import { SET_FILETER } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";

const initialState = VISIBILITY_FILTERS.ALL;

const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILETER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default visibilityFilter;
