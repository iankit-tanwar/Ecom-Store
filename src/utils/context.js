import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const context = createContext();


const AppContext = ({ children }) => {

    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();

    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const loaction = useLocation();


    useEffect(() => {

    }, [cartItems])

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems];  // Fix: Use spread operator to create a new array
        let index = items.findIndex((p) => p.id === product.id);  // Fix: Correct variable name
        if (index !== -1) {
          items[index].attributes.quantity += quantity;
        } else {
          product.attributes.quantity = quantity;
          items = [...items, product];
        }
    
        setCartItems(items);
      };
    const handleRemoveFromCart = (product) => { 
        let items = [...cartItems];
        items.filter(p=> p.id !== product.id);
        setCartItems(items)

    };
    const handleCartProductQuantity = (type, product) => { };

    return <context.Provider
        value={{
            categories,
            setCategories,
            products,
            setProducts,
            cartItems,
            cartCount,
            cartSubTotal,
            handleAddToCart,
            handleRemoveFromCart,
            handleCartProductQuantity
        }}>
        {children}
    </context.Provider>
}

export default AppContext;
