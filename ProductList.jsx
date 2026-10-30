import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import './App.css';

// Builds a simple SVG thumbnail so every plant always has an image.
// Swap any `image` below for a real photo URL if you prefer.
const thumb = (emoji, bg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220">` +
      `<rect width="300" height="220" fill="${bg}"/>` +
      `<text x="150" y="130" font-size="90" text-anchor="middle">${emoji}</text></svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('🪴', '#dcebd5'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: thumb('🌿', '#e3efd0'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: thumb('🌸', '#e8efe0'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: thumb('🌱', '#d6ead9'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: thumb('🍃', '#dbe9d2'), description: 'Easy-care plant that absorbs airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: thumb('🌵', '#e9f0d8'), description: 'Purifies air and soothes burns and cuts.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumb('💜', '#e6e0f0'), description: 'Calming scent that promotes relaxation and sleep.', cost: 20 },
      { name: 'Jasmine', image: thumb('🌼', '#f3efd8'), description: 'Sweet fragrance that lifts mood and reduces stress.', cost: 18 },
      { name: 'Rosemary', image: thumb('🌿', '#dfeadb'), description: 'Fragrant herb that also works in the kitchen.', cost: 15 },
      { name: 'Mint', image: thumb('🍀', '#d5ecd9'), description: 'Refreshing aroma that repels pests.', cost: 12 },
      { name: 'Lemon Balm', image: thumb('🍋', '#f1f0d2'), description: 'Citrus scent that eases anxiety.', cost: 14 },
      { name: 'Hyacinth', image: thumb('🌷', '#efdfe6'), description: 'Spring bloomer with an intense, sweet perfume.', cost: 22 },
    ],
  },
  {
    category: 'Low-Maintenance Succulents',
    plants: [
      { name: 'Jade Plant', image: thumb('🪴', '#d9ebdc'), description: 'Long-living succulent said to bring good luck.', cost: 16 },
      { name: 'Echeveria', image: thumb('🥬', '#dfecde'), description: 'Rosette-shaped succulent in soft pastel shades.', cost: 10 },
      { name: 'Haworthia', image: thumb('🌵', '#e2eed6'), description: 'Compact, striped plant that thrives in low light.', cost: 11 },
      { name: 'Zebra Cactus', image: thumb('🌵', '#e8efd9'), description: 'Distinctive white stripes and very little water needed.', cost: 13 },
      { name: 'String of Pearls', image: thumb('📿', '#dbeadf'), description: 'Trailing stems of bead-like leaves.', cost: 19 },
      { name: 'Burro\'s Tail', image: thumb('🌿', '#d8ead4'), description: 'Cascading succulent ideal for hanging baskets.', cost: 17 },
    ],
  },
];

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

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

      <div className="product-page">
        {plantsArray.map((group) => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img className="product-thumb" src={plant.image} alt={plant.name} />
                  <h3 className="product-name">{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p className="product-price">${plant.cost}</p>
                  <button
                    className="add-to-cart-button"
                    disabled={isInCart(plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
