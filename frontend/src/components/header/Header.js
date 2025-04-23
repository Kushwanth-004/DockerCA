import React, { useContext } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import './header.css'
import { MdOutlineAddShoppingCart } from "react-icons/md";

import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
export const Header = () => {
    const state=useContext(GlobalState)
    const [isLogged,setIsLogged]=state.UserApi.isLogged;
    const [isAdmin,setIsAdmin]=state.UserApi.isAdmin;
    const [cart,setCart]=state.UserApi.cart;
    // console.log(state);
    const adminRouter=()=>{
        return (
            <>
                <li>
                    <Link to='/create_product'>
                        Create Product
                    </Link>
                </li>
                <li>
                    <Link to='/categories'>
                        Categories
                    </Link>
                </li>
            </>
        )
    }
    const loggedRouter=()=>{
        return (
            <>
                <li><Link to='/history'>History</Link></li>
                <li><Link to='/Logout'>Logout</Link></li>
            </>
        )
    }
  return (
    <header>
        
        <div className='menu'>
            <MdOutlineMenu size={30} />
            <MdClose />
        </div>
        <div className='logo'>
            <h1>
                <Link to='/'>{isAdmin?'Admin':'Home'}</Link>
            </h1>
        </div>
        <ul>
            <li>
                <Link to='/'>{isAdmin?'Products':'Shop'}</Link>
            </li>
            {isAdmin && adminRouter()}
            {isLogged ? loggedRouter() : <li><Link to='/login'>Login or Register</Link></li>}
            
            {/* <li>
                <Link to='/logout'>Logout</Link>
            </li> */}
            <li><MdClose size={30} className='menu'/></li>
        </ul>
        {isAdmin ? '' : <div className='cart-icon'>
            <span>{cart.length}</span>
            <Link to='/cart'>
                <MdOutlineAddShoppingCart size={30}/>
            </Link>
        </div>}
        
        
    </header>
  )
}
