import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;