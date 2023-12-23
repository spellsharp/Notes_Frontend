import { GLOBAL_SEARCH, LOCAL_SEARCH } from "../../constants/ActionTypes";

const initialState = {
  query: "",
  global: false,
};

const searchReducer = (state=initialState, action) => {
    switch (action.type) {
        case GLOBAL_SEARCH:
        return {
            ...state,
            query: action.payload,
            global: true,
        };
        case LOCAL_SEARCH:
        return {
            ...state,
            query: action.payload,
            global: false,
        };
        default:
        return state;
    }
}

export default searchReducer;