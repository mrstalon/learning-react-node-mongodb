import { combineReducers, createStore } from 'redux';

import list from './list/list';
import choosedItem from './choosed-item/choosed-item';

const reducer = combineReducers({ list, choosedItem });
const store = createStore(reducer);

export default store;