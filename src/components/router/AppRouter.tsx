import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from "../layouts/main/AppLayout"
  
const LoginPage = React.lazy(() => import('../../pages/LoginPage')); 
const Products = React.lazy(() => import('../../pages/ProductsPage')); 
     

export const AppRouter: React.FC = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={sessionStorage.getItem("token") !==null ? <AppLayout /> : <Navigate  to="/" />}>
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="/">
          <Route path="/" element={<LoginPage />} /> 
        </Route> 
      </Routes>
    </BrowserRouter>
  );
};
