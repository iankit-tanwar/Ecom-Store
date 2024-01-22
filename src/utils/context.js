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
    window.scrollTo(0, 0)
  }, [loaction])

  useEffect(() => {

    let count = 0;
    cartItems.map(item => count += item.attributes.quantity);
    setCartCount(count)

    let subTotal = 0;

    cartItems.map(items => subTotal += items.attributes.price * items.attributes.quantity);
    setCartSubTotal(subTotal);

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
    items = items.filter(p => p.id !== product.id);
    setCartItems(items)

  };
  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];  // Fix: Use spread operator to create a new array
    let index = items.findIndex((p) => p.id === product.id);  // Fix: Correct variable name
    if (type === "inc") {
      items[index].attributes.quantity += 1
    } else if (type === 'dec') {
      if (items[index].attributes.quantity === 1) return;
      items[index].attributes.quantity -= 1
    }
    setCartItems(items)
  };

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
