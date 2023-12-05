import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Home from './client/pages/Home/Home';
import AboutUs from './client/pages/AboutUs';
import Contact from './client/pages/Contact';
import AiFinder from './client/pages/AiFinder';
import MyCart from './client/pages/MyCart';
import FlowerDetails from './client/pages/FlowerDetails';
import QuickFinder from './client/pages/QuickFinder';
import FilteredProducts from './client/pages/FilteredProducts';

import Products from './admin/pages/Products/Products';
import Orders from './admin/pages/Orders'

import { DataProvider } from './context/DataContext'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Analytics from './admin/pages/Analytics';
import Login from './admin/pages/Login';
import Accounts from './admin/pages/Accounts';
import DataContext from './context/DataContext';
import React, { useContext } from 'react';

const ProtectedRoute = () => {
  const { isLogin } = useContext(DataContext);

  return isLogin ? <Outlet/> : <Navigate to='/admin'/>
}

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-finder" element={<AiFinder />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quick-finder" element={<QuickFinder />} />
            <Route path="/my-cart" element={<MyCart />} />
            <Route path="/product/:identifier" element={<FlowerDetails/>}/>
            <Route path="/products/:identifier" element={<FilteredProducts/>}/>

            <Route path="/admin" element={<Login/>} />
            <Route path="/admin" element={<ProtectedRoute/>}>
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/accounts" element={<Accounts />} />
            </Route>
            {/*<Route path="*" element={} />*/}
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </LocalizationProvider> 
  )
}
