import React, { useEffect, useState } from 'react'
import Order from './Order';
import {useAuth} from "../context/GlobalState";
import "./Orders.css";
import axios from "./axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const {user} = useAuth();


  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`/api/payments/get-items/${user.uid}`);
      setOrders(response.data);
    };
    if(user) fetchOrders();
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className="orders-order">
        {orders?.map((order) => (
          <Order order={order}/>
        ))}
      </div>
    </div>
  )
}

export default Orders
