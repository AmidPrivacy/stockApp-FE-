import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from "../layouts/main/AppLayout"
  
const LoginPage = React.lazy(() => import('../../pages/LoginPage')); 
const Products = React.lazy(() => import('../../pages/ProductsPage')); 
const Categories = React.lazy(() => import('../../pages/CategoriesPage')); 
const UsersPage = React.lazy(() => import('../../pages/UsersPage')); 
const SellersPage = React.lazy(() => import('../../pages/SellersPage')); 
     

export const AppRouter: React.FC = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={sessionStorage.getItem("token") !==null ? <AppLayout /> : <Navigate  to="/" />}>
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="sellers" element={<SellersPage />} />
        </Route>
        <Route path="/" element={sessionStorage.getItem("token") ===null ? null : <Navigate  to="/admin/products" />}>
          <Route path="/" element={<LoginPage />} /> 
        </Route> 
      </Routes>
    </BrowserRouter>
  );
};
