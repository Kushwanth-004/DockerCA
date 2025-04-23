import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityTypes, trackActivity } from '../components/mainpages/utils/tracker';

export const UserApi = (token) => {
    const [isLogged,setIsLogged]=useState(false);
    const [isAdmin,setIsAdmin]=useState(false);
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        if(token){
            const getUser=async()=>{
                try{
                    const res=await axios.get('/user/infor',{headers:{Authorization:token}})
                    setIsLogged(true);
                    res.data.role===1 ? setIsAdmin(true):setIsAdmin(false)
                    console.log(res);
                }
                catch(err){
                    alert(err.response.data.msg);
                }
            }
            getUser();
        }
    },[token])
    const addCart=async({product})=>{
        if(!isLogged) return alert("Please Login ")
        
        console.log(product)
        const {_id}=await product;
        // console.log(product)
        const check=cart.every(item=> item._id!==_id)
        // cart.every(item=> console.log(item))
        if(check){
            setCart([...cart,{...product,quantity:1}]);
            trackActivity(ActivityTypes.ADD_TO_CART, _id);
            
        }
        else{
            alert("This product has been already added to Cart");
        }
        // console.log(cart);
    }
    
  return ({
    isLogged:[isLogged,setIsLogged],
    isAdmin:[isAdmin,setIsAdmin],
    cart:[cart,setCart],
    addCart:addCart
  })
}
