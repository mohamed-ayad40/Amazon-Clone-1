import React from "react";
import checkoutImg from "../assets/images/checkoutAd.jpg";
import { useAuth } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct.jsx";
import Subtotal from "./Subtotal.jsx";
import "./Checkout.css";

const Checkout = () => {
    const { user, basket } = useAuth();
    return (
        <div className="checkout">
            <div className="checkout-left">
                <img className="checkout-ad" src={checkoutImg} alt="" />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout-title">Your shopping basket</h2>
                    {basket.length > 0 ? basket.map((item) => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    )) : <p>
                            You have no items in your basket. To buy one or more items, click <strong>"Add to basket"</strong>
                        </p>}
                </div>
            </div>
            <div className="checkout-right">
                <Subtotal />
            </div>
        </div>
    );
};

export default Checkout;
