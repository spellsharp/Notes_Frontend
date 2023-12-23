import { SET_TITLE, SET_DESCRIPTION, SET_TAG, SET_PUBLIC, CREATE_NOTE, UPDATE_NOTE, SET_PRIVATE } from "../../constants/ActionTypes";

const initialState = {
  title: "",
  description: "",
  tags: {},
  public: false,
  updated_at: "",
  created_at: new Date(),
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload, updated_at: new Date() };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload, updated_at: new Date() };
    case SET_TAG:
      return { ...state, tags: action.payload, updated_at: new Date() };
    case SET_PUBLIC:
      return { ...state, public: true, updated_at: new Date() };
    case SET_PRIVATE:
      return { ...state, public: false };
    case CREATE_NOTE:
        return initialState;
    default:
      return state;
  }
};

export default notesReducer;