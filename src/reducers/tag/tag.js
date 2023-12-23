import {CREATE_TAG} from "../../constants/ActionTypes";

const initialState = {
    tag: {
        name: "",
        color: "",
    },
};

const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TAG:
            return initialState;
        default:
            return state;
    }
}

export default tagReducer; 