export const getBasketTotal = (basket) => {
    return basket.reduce((acc, item) => acc + item.price * 1, 0); // Multiply price by one as quantity
    
};
export const initialState = {
    basket: [],
    user:  null,
};

const AppReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_USER":
            return {...state, user: action.user};
        case  "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case "EMPTY_BASKET": 
            return {
                ...state,
                basket: []
            }
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(item => item.id === action.id);
            let newBasket = [...state.basket];
            if(index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn("Cant remove product as it is not in basket");
            }
            return {
                ...state,
                basket: newBasket
            }
        default:
            return state;
    }
};

export default AppReducer;