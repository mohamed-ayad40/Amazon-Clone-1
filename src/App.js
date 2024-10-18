import React, { useEffect } from 'react'
import {Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import { auth } from './firebase';
import { useAuth } from './context/GlobalState';
import Checkout from "./components/Checkout.jsx";
import Home from './components/Home';
import Payment from "./components/Payment.jsx";
import Orders from "./components/Orders.jsx";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const App = () => {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe("pk_test_51Q8fIQ05ILC7zK6s37QlIwNK3KCxMYzAJK8R9uz85ss33yw0j3NKkmUowmGmpIfcge4JXLW2W9gi1hch01MppTqH00pFPJjSPZ");
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    });
  }, []);
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<>
          <Header />
          <Home />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={
          <>
            <Header />
            <Checkout />
          </>
        } />
        <Route path="/payment" element={<>
          <Header />
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </>}/>
        <Route path="/orders" element={
          <>
            <Header />
            <Orders />
          </>
        } />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
