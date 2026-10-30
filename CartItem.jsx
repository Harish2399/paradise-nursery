import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './App.css';

function CartItem({ onHomeClick, onPlantsClick, onCartClick, onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost for one plant type (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount for every plant in the cart
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  // updateQuantity removes the item automatically when quantity reaches 0
  const handleDecrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleCheckout = () => alert('Checkout: Coming Soon!');

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Paradise Nursery</div>
        <div className="navbar-links">
          <a onClick={onHomeClick}>Home</a>
          <a onClick={onPlantsClick}>Plants</a>
          <a onClick={onCartClick} className="cart-link" aria-label="Cart">
            <svg className="cart-icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <rect width="256" height="256" fill="none" />
              <circle cx="80" cy="216" r="12" fill="#fff" />
              <circle cx="184" cy="216" r="12" fill="#fff" />
              <path d="M42.3 72H221.7l-26.4 92.4A15.9 15.9 0 0 1 179.9 176H84.1a15.9 15.9 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8"
                fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      <div className="cart-page">
        <h2>Shopping Cart</h2>
        <p className="cart-total-amount">Total Cart Amount: ${calculateTotalAmount()}</p>

        {cartItems.length === 0 && (
          <p className="empty-cart">Your cart is empty. Add a plant to get started.</p>
        )}

        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-thumb" src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p>Unit price: ${item.cost}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
              </div>
            </div>
            <div className="cart-item-subtotal">Total: ${calculateTotalCost(item)}</div>
            <button className="delete-button" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))}

        <div className="cart-actions">
          <button className="continue-button" onClick={onContinueShopping}>Continue Shopping</button>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
