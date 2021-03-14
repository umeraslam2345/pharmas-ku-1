
const initialState = {
    piece: 1,
    basket: 0
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT_PIECE':
            return { piece: state.piece + 1 }
            break;
        case 'DECREMENT_PIECE':
            return { piece: state.piece - 1 }
            break;
        case 'ECOM_ON' :
            return {basket: state.piece}
            break;
        default:
            return state
    }
}


export default rootReducer;