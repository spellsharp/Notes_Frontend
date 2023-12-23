import { CREATE_TAG } from "../../constants/ActionTypes";

const createTag = (tag) => ({
  type: CREATE_TAG,
  payload: tag,
});

export default createTag;