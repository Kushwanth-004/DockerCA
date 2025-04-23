import React from 'react'
import {Route,Routes} from 'react-router-dom';
import { Cart } from './cart/Cart';
import { Login } from './login/Login';
import { Register } from './login/Register';
import { Product } from './products/Product';
import { DetailProduct } from './utils/DetailProducts/DetailProduct';
import { Logout } from './login/Logout';
import Tempp from './products/Tempp';
import CreateProduct from './products/CreateProduct';
import { DeleteProduct } from './products/DeleteProduct';
const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Product/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create_product' element={<CreateProduct/>}/>
      <Route path='/delete/:id' element={<DeleteProduct/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/image' element={<Tempp/>}/>
      <Route path='/detail/:id' element={<DetailProduct/>}/>
    </Routes>
  )
}

export default Pages