import { createContext, useState } from "react";


export const context = createContext();


const AppContext = ({ children }) => {

    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();

    return <context.Provider
                value={{
                    categories,
                    setCategories,
                    products,
                    setProducts
                }}>
        {children}
    </context.Provider>
}

export default AppContext;
