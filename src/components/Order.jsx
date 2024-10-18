import React from 'react';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import "./Order.css"

const Order = ({order}) => {
  return (
    <div>
      <div className="order">
        <h2>Order</h2>
        <p>{moment(order.createdAt).format("MMMM Do YYYY h:mma")}</p>
        <p className='order-id'>
          <small>{order._id}</small>
        </p>
        {order.basket?.map((item) => (
          <CheckoutProduct hiddenButton={true} key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
        ))}
        <CurrencyFormat renderText={(value) => (
          <h3 className='order-total'>Order Total: {value}</h3>
          )}
            decimalScale={2}
            value={order.amount * 100}
            displayType='text'
            thousandSeparator={true}
            prefix='$'
        />
      </div>
    </div>
  )
}

export default Order
