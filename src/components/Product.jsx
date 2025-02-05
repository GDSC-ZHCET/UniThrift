import React from 'react'
import './product.css'
import scale from '../assets/scale.webp';



const Product = () => {
  return (
    <div className="product">
      <div className="image">
        <img src={scale} alt="Product" />
      </div>
      <div className="name">
        <h1>15 cm Steel Scale</h1>
        <div className="description">
          <p>Some basic description stuff about the product, its time of usage and condition</p>
        </div>
        <div className="price">
          <p>Rs.20</p>
        </div>
        <div className="ATC">
          <button>Add to Cart</button>
        </div>
        <div className="ATW">
          <button>Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
