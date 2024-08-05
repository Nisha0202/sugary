import React, { useEffect, useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // Check if the item with the same ID and size already exists
            const existingItemIndex = state.findIndex(
                item => item.id === action.id && item.size === action.size
            );

            if (existingItemIndex !== -1) {
                // Item exists, update the quantity
                return state.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, qty: item.qty + action.qty, price: action.price }
                        : item
                );
            } else {
                // Item does not exist, add a new one
                return [
                    ...state,
                    {
                        id: action.id,
                        name: action.name,
                        qty: action.qty,
                        size: action.size,
                        price: action.price,
                        img: action.img
                    }
                ];
            }

        case "UPDATE":
            // Update an existing item
            return state.map(item =>
                item.id === action.id && item.size === action.size
                    ? { ...item, qty: action.qty, price: action.price }
                    : item
            );

        case "REMOVE":
            return state.filter((item, index) => index !== action.index);
        case "CLEAR":
            return [];

        default:
            console.error("Unhandled action type:", action.type);
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
