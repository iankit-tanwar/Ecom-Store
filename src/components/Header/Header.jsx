
import { TbSearch } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";

import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Search from "./Search/Search";
import { useNavigate } from "react-router-dom";
import { context } from "../../utils/context";
const Header = () => {

    const [scrolled, setScrolled] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const {cartCount}= useContext(context);
    const navigate = useNavigate()
    const handleScroll = () => {
        const offset = window.scrollY;
        //console.log(offset)
        if (offset > 200) {
            setScrolled(true)
        }else{

            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

    }, [])

    return (
    <>
    <header className={`main-header ${scrolled ? 'sticky-header' : ''}`}>
        <div className="header-content">
            <ul className="left">
                <li onClick={()=>{navigate('/')}}>Home</li>
                <li>About</li>
                <li>Categories</li>
            </ul>
            <div className="center" onClick={()=>{navigate('/')}}>
                TSTORE.
            </div>
            <div className="right">
                <TbSearch onClick={()=>{setShowSearch(true)}}/>
                <AiOutlineHeart />
                <span className="cart-icon" onClick={()=>{setShowCart(true)}}>
                    <CgShoppingCart />
                    {!!cartCount && <span>{cartCount}</span>}
                </span>
            </div>
        </div>
    </header>
    {showCart && <Cart setShowCart={setShowCart} />}
    {showSearch &&  <Search setShowSearch={setShowSearch} />}

   
    
    </>
    )
};

export default Header;
