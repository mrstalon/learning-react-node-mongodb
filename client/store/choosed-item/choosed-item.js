export default function choosedItem (state = { name: '', info: '' }, action) {
    switch (action.type) {
        case ('CHANGE_CHOOSED_ITEM'): {
            return {
                ...action.newItem,
            }
        }
        default: {
            return state;
        }
    }
}