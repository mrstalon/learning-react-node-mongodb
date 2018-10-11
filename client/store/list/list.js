export default function list(state = [], action) {
    switch (action.type) {
        case ('ADD_ITEM'): {
            return [
                ...state,
                action.newItem,
            ]
        }
        case ('SET_ITEMS_LIST'): {
            return [
                ...action.newList,
            ]
        }
        default: {
            return state;
        }
    }
}