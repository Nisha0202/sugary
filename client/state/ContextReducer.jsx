import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // Check if the item already exists in the cart
            const existingIndex = state.findIndex(item => item.title === action.payload.title);
            if (existingIndex !== -1) {
                // Item exists, update quantity
                const updatedCart = [...state];
                updatedCart[existingIndex].qty += action.payload.qty;
                return updatedCart;
            } else {
                // Item doesn't exist, add it to cart
                return [...state, action.payload];
            }
        case "REMOVE":
            return state.filter((item, index) => index !== action.index);
        case "DROP":
            return [];
        case "UPDATE":
            return state.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item);
        default:
            console.error("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
