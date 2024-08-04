import React, { useEffect, useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const existingIndex = state.findIndex(item => item.title === action.payload.title);
            if (existingIndex !== -1) {
                const updatedCart = [...state];
                updatedCart[existingIndex].qty += action.payload.qty;
                return updatedCart;
            } else {
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
    const [state, dispatch] = useReducer(reducer, [], initial => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : initial;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

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
