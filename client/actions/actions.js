const ADD_ITEM = 'ADD_ITEM';
const CHANGE_CHOOSED_ITEM  = 'CHANGE_CHOOSED_ITEM';
const SET_ITEMS_LIST = 'SET_ITEMS_LIST';

export function addItem (newItem) {
    return {
        type: ADD_ITEM,
        newItem,
    }
}

export function setItemsList (newList) {
    return {
        type: SET_ITEMS_LIST,
        newList,
    }
}

export function changeChoosedItem (newItem) {
    return {
        type: CHANGE_CHOOSED_ITEM,
        newItem,
    }
}