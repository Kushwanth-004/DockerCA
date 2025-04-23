import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';

export const BtnRender = ({ product }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.UserApi.isAdmin;
  const addCart = state.UserApi.addCart;
  console.log(product)
  return (
    <div>
      <div className="row_btn flex justify-between mt-4 space-x-4">
        {
          isAdmin ? (
            <>
              <Link
                id="btn_delete"
                to={`delete/${product._id}`}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 text-center w-full"
              >
                Delete
              </Link>
              <Link
                id="btn_edit"
                to={`detail/${product._id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-center w-full"
              >
                Edit
              </Link>
            </>
          ) : (
            <>
              <Link
                id="btn_buy"
                to={`detail/${product._id}`}
               
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-center w-full"
              >
                Buy
              </Link>
              <Link
                id="btn_view"
                to={`detail/${product._id}`}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 text-center w-full"
              >
                View
              </Link>
            </>
          )
        }
      </div>
    </div>
  );
};
