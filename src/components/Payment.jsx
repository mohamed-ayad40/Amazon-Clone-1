import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth} from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct.jsx";
import { getBasketTotal } from '../context/AppReducer';
import CurrencyFormat from "react-currency-format";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "./axios.js";
import "./Payment.css";

const Payment = () => {
    const {basket, user, dispatch} = useAuth();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    useEffect(() => {
        const getClientSecret  = async () => {
            const response = await axios.post(`/payments/create?total=${getBasketTotal(basket) * 100}`);
            setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
    }, [basket]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        }).then(async ({paymentIntent}) => {
            const response = await axios.post("/api/payments/buy-items", {
                basket,
                amount: paymentIntent.amount,
                userId: user?.uid
            });
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            navigate("/orders", {replace: true});
            dispatch({
                type: "EMPTY_BASKET",
            })
        })
    };
    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(error ? error.message : "");
    };
    return (
        <div className='payment'>
            <div className="payment-container">
                <h1>Checkout (<Link to="/checkout">{basket.length} items</Link>)</h1>
                {/* Delivery Address */}
                <div className='payment-section'>
                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                        <div className='payment-address'>
                            <p>{user?.email}</p>
                            <p>Alexandria, Egypt</p>
                        </div>
                    </div>
                </div>
                {/* Review Items */}
                <div className='payment-section'>
                    <div className="payment-title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment-items'>
                        {basket.map((item) => (
                            <CheckoutProduct id={item.id} key={item.id} image={item.image} price={item.price} rating={item.rating} title={item.title} />
                        ))}
                    </div>
                </div>
                {/* Payment Method */}
                <div className='payment-section'>
                    <h3>Payment Method</h3>
                    <div className='payment-details'>
                        <form onSubmit={handleSubmit}>
                            {/* Stripe Card */}
                            <CardElement onChange={handleChange} />
                            <div className='payment-priceContainer'>
                                <CurrencyFormat renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType='text'
                                    thousandSeparator={true}
                                    prefix='$'
                                />
                                <button disabled={disabled || succeeded || processing} type='submit'>
                                    <span>{processing ? <p>Processing...</p> : <p>Pay</p>}</span>

                                </button>
                            </div>
                            {error &&  <div>{error}</div>}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
