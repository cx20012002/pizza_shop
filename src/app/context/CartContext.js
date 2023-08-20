'use client'

// create context

import {createContext, useEffect, useState} from "react";

export const CartContext = createContext(null);

const CartProvider = ({children}) => {
    // cart open state
    const [isOpen, setIsOpen] = useState(false);
    // cart state
    const [cart, setCart] = useState([]);

    const [cartTotal, setCartTotal] = useState(0);

    const [itemAmount, setItemAmount] = useState(0);

    useEffect(() => {
        const amount = cart.reduce((total, item) => total + item.amount, 0);
        setItemAmount(amount);
    }, [cart])

    useEffect(() => {
        const price = cart.reduce((a, c) => {
            return a + Number(c.price) * c.amount
        }, 0)
        setCartTotal(price)
    }, [cart]);

    // add to cart
    const addToCart = (id, image, name, price, additionalTopping, size, crust) => {
        // sort additionalTopping array by name
        additionalTopping.sort((a, b) => a.name.localeCompare(b.name));
        const newItem = {
            id, image, name, price, additionalTopping, size, crust, amount: 1
        }

        const cartItemIndex = cart.findIndex((item) =>
            item.id === id &&
            item.price === price &&
            item.size === size &&
            JSON.stringify(item.additionalTopping) === JSON.stringify(additionalTopping) &&
            item.crust === crust
        );

        if (cartItemIndex === -1) {
            setCart([...cart, newItem]);
        } else {
            const newCart = [...cart];
            newCart[cartItemIndex].amount += 1;
            setCart(newCart);
        }

        setIsOpen(true)
    }

    const removeItem = (id, price, size, additionalTopping, crust) => {
        const itemIndex = cart.findIndex((item) => item.id === id && item.price === price && item.crust === crust);
        if (itemIndex !== -1) {
            const newCart = [...cart];
            newCart.splice(itemIndex, 1);
            setCart(newCart);
        }
    }

    const increaseAmount = (id, price) => {
        const itemIndex = cart.findIndex((item) => item.id === id && item.price === price);
        if (itemIndex !== -1) {
            const newCart = [...cart];
            newCart[itemIndex].amount += 1;
            setCart(newCart);
        }
    }


    // decrease amount and remove product if amount is 0
    const decreaseAmount = (id, price) => {
        const itemIndex = cart.findIndex((item) => item.id === id && item.price === price);
        if (itemIndex !== -1) {
            const newCart = [...cart];
            newCart[itemIndex].amount -= 1;
            if (newCart[itemIndex].amount === 0) {
                newCart.splice(itemIndex, 1);
            }
            setCart(newCart);
        }
    }


    return (
        <CartContext.Provider
            value={{
                isOpen,
                setIsOpen,
                addToCart,
                setCart,
                cart,
                removeItem,
                increaseAmount,
                decreaseAmount,
                itemAmount,
                cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
