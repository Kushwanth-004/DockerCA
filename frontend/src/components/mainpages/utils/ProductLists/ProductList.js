import React, { useContext, useEffect, useState } from 'react';
import { BtnRender } from './BtnRender';
import { ActivityTypes, trackActivity } from '../tracker';


export const ProductList = ({ product, isAdmin }) => {
  const [flag, setFlag] = useState(false);

  // Function to handle checkbox for delete flag
  const deleteFunction = (e) => {
    if (e.target.checked) {
      setFlag(true);
    } else {
      setFlag(false); // Reset flag if unchecked
    }
  };

  // useEffect(() => {
  //   // Track product view when component mounts
  //   trackActivity(ActivityTypes.PRODUCT_VIEW, product._id);

  //   // Track time spent viewing
  //   const startTime = Date.now();
  //   return () => {
  //     const duration = Date.now() - startTime;
  //     trackActivity(ActivityTypes.PRODUCT_VIEW, product._id);
  //   };
  // }, [product._id]);
  return (
    <div className="product_list flex flex-col h-full justify-between border border-gray-200 rounded-lg shadow-lg p-4 bg-white">
      {/* Admin Checkbox */}
      {isAdmin && (
        <input
          type="checkbox"
          onChange={deleteFunction}
          className="form-checkbox h-5 w-5 text-blue-600 mb-3"
        />
      )}

      {/* Product Image */}
      <div className="product_card">
        <img
          src={product.images.url}
          alt={product.product_title}
          className="w-full h-64 object-full rounded-t-lg mb-4"
        />
      </div>

      {/* Product Info */}
      <div className="product_box flex-grow">
        <h2 className="text-xl font-semibold text-gray-800" title={product.product_title}>
          {product.product_title}
        </h2>
        <span className="text-lg text-gray-600 font-medium mt-2 block">
          {product.price ? `₹${product.price}` : 'Price unavailable'}
        </span>
        <p className="text-gray-500 mt-2">{product.description}</p>
      </div>

      {/* Render the Button */}
      <div className="mt-4">
        <BtnRender product={product} />
      </div>
    </div>
  );
};
