import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';
import { ActivityTypes, trackActivity } from '../tracker';


export const DetailProduct = () => {
    const params = useParams();
    const state = useContext(GlobalState);
    const products = state.ProductApi.products[0];
    const addCart = state.UserApi.addCart;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
              if (product._id === params.id) {
                setDetailProduct(product);
                trackActivity(ActivityTypes.PRODUCT_VIEW, product._id);
              }
            });
          }
    }, [params, products]);
    if (detailProduct.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
                {/* Product Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={detailProduct.images.url}
                        alt="productImage"
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            {detailProduct.product_title}
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">
                            Product ID: <span className="text-gray-700">{detailProduct.product_id}</span>
                        </p>
                        <span className="text-3xl font-semibold text-blue-600 mb-4 block">
                            ₹{detailProduct.price}
                        </span>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            {detailProduct.description}
                        </p>
                        <p className="text-gray-500 leading-relaxed mb-6">
                            {detailProduct.content}
                        </p>
                        <p className="text-gray-700 font-medium">
                            <strong>Sold:</strong> {detailProduct.sold}
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <Link
                        to="/cart"
                        className="inline-block mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-center"
                        onClick={() => addCart({ product: detailProduct })}
                    >
                        Add to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};
