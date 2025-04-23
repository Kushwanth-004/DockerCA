import React, { useState,useEffect } from 'react'
import axios from 'axios'

export const ProductApi = () => {
    const [products,setProducts]=useState([]);
    const getProducts=async()=>{
        const res=await axios.get('/api/products');
        const data=await res.data;
        setProducts(data)
        // console.log(data);
    }
    useEffect(()=>{
      getProducts()
    },[]);
    
  return ({
    products:[products,setProducts]
  })
}
