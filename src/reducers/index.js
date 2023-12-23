import { combineReducers } from 'redux';
import notesReducer from './notes/notes';
import searchReducer from './search/search';
import tagReducer from './tag/tag';

const rootReducer = combineReducers({
  notes: notesReducer,
  search: searchReducer,
  tag: tagReducer,
});

export default rootReducer;