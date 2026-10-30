import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  // 'home' | 'plants' | 'cart'
  const [view, setView] = useState('home');

  if (view === 'plants') {
    return (
      <ProductList
        onHomeClick={() => setView('home')}
        onPlantsClick={() => setView('plants')}
        onCartClick={() => setView('cart')}
      />
    );
  }

  if (view === 'cart') {
    return (
      <CartItem
        onHomeClick={() => setView('home')}
        onPlantsClick={() => setView('plants')}
        onCartClick={() => setView('cart')}
        onContinueShopping={() => setView('plants')}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="landing-page">
        <div className="landing-overlay">
          <h1 className="landing-title">Paradise Nursery</h1>
          <p className="landing-tagline">Where green meets serenity</p>
          <button className="get-started-button" onClick={() => setView('plants')}>
            Get Started
          </button>
        </div>
      </div>
      <AboutUs />
    </div>
  );
}

export default App;
