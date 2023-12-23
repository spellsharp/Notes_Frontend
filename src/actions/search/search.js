import {GLOBAL_SEARCH, LOCAL_SEARCH} from '../../constants/ActionTypes';

const globalSearch = (query) => ({
    type: GLOBAL_SEARCH,
    payload: query,
});

const localSearch = (query) => ({
    type: LOCAL_SEARCH,
    payload: query,
});

export default {
    globalSearch,
    localSearch,
};