import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/images/amazon-logo-2.png";
import SearchIcon from "../assets/images/search-svgrepo-com.svg";
import shoppingCart from "../assets/images/shopping-cart.svg";
import "./Header.css"
import { useAuth } from '../context/GlobalState';
import { auth } from "../firebase";
const Header = () => {
    const {user, basket} = useAuth();
    const handleAuthentication = () => {
        auth.signOut();
    };
    return (
        <div className="header">
            <Link to="/">
                <img className="header-logo" src={Logo} alt="logo-img" />
            </Link>
            <div className='header-search'>
                <input className='header-searchInput' placeholder='Amazon.eg بحث' type='text' />
                <img className='header-searchIcon' src={SearchIcon} alt='search-icon' />
            </div>
            <div className="header-nav">
                <Link to={!user && "/login"}>
                    <div className="header-option" onClick={handleAuthentication}>
                        <span className='header-optionLineOne'>Hello {`${user?.email ||  'Guest'}`}</span>

                        <span className='header-optionLineTwo'>Sign {!user? "In" : "Out"}</span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className='header-option'>
                        <div className='header-optionLineOne'>Returns</div>
                        <div className='header-optionLineTwo'>& Orders</div>
                    </div>
                </Link>
                <div className='header-option'>
                    <div className='header-optionLineOne'>Your</div>
                    <div className='header-optionLineTwo'>Prime</div>
                </div>
                <Link to="/checkout">
                    <div className='header-optionBasket'>
                        <img src={shoppingCart} alt="shopping-cart-icon" />
                        <span className='header-optionLineTwo header-basketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
