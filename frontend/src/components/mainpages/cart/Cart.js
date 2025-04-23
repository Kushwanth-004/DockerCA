import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.UserApi.cart;

  if (cart.length === 0) {
    return (
      <h2 className="text-center text-5xl font-medium text-gray-700 mt-20">
        Cart Empty
      </h2>
    );
  }

  return (
    <div flex-col>
      <div className="container mx-auto px-4 py-8">
        {cart.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 shadow-lg rounded-lg border border-gray-200 mb-8"
          >
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <img
                src={product.images.url}
                alt="productImage"
                className="w-full h-full object-cover rounded-lg hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.product_title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Product ID: <span className="text-gray-700">{product.product_id}</span>
                </p>
                <span className="text-2xl font-semibold text-blue-600 mb-4 block">
                  ₹{product.price}
                </span>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {product.content}
                </p>
                <p className="text-gray-700 font-medium">
                  <strong>Sold:</strong> {product.sold}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button Container */}
      <div className="flex justify-center items-center mt-6 py-10">
        <button className="bg-green-700 rounded-3xl text-white px-8 py-3 hover:bg-green-600">
          Buy
        </button>
      </div>
    </div>
  );
};
