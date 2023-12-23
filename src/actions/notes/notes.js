import {
  SET_TAG,
  SET_DESCRIPTION,
  SET_TITLE,
  SET_PUBLIC,
  CREATE_NOTE,
  SET_PRIVATE,
} from "../../constants/ActionTypes";

const setTag = (tag) => ({
  type: SET_TAG,
  payload: tag,
});

const setDescription = (description) => ({
  type: SET_DESCRIPTION,
  payload: description,
});

const setTitle = (title) => ({
  type: SET_TITLE,
  payload: title,
});

const setPublic = () => ({
  type: SET_PUBLIC,
});

const setPrivate = () => ({
  type: SET_PRIVATE,
});

// const updateNote = (data) => ({
//   type: UPDATE_NOTE,
//   payload: data,
// });

const createNote = () => ({
  type: CREATE_NOTE,
});

export default {
  setTag,
  setDescription,
  setTitle,
  setPublic,
  setPrivate,
  updateNote,
  createNote,
};
