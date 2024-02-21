import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from "../layouts/main/AppLayout"
// import Loader from '../Loader';

const LoginPage = React.lazy(() => import('../../pages/LoginPage')); 
const Products = React.lazy(() => import('../../pages/ProductsPage')); 
const Categories = React.lazy(() => import('../../pages/CategoriesPage')); 
const UsersPage = React.lazy(() => import('../../pages/UsersPage')); 
const SellersPage = React.lazy(() => import('../../pages/SellersPage')); 
const OrdersPage = React.lazy(() => import('../../pages/OrdersPage')); 
const StockPage = React.lazy(() => import('../../pages/StockPage')); 
const SalesPage = React.lazy(() => import('../../pages/SalesPage')); 
const PrintSale = React.lazy(() => import('../../components/Sales/PrintSale/index')); 
     

export const AppRouter: React.FC = () => {
  
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/admin" element={sessionStorage.getItem("token") !==null ? <AppLayout /> : <Navigate  to="/" />}>
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="sellers" element={<SellersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="sales" element={<SalesPage />} />
          </Route>
          <Route path="/print-sale" element={<PrintSale />} />
          <Route path="/" element={sessionStorage.getItem("token") ===null ? null : <Navigate  to="/admin/products" />}>
            <Route path="/" element={<LoginPage />} /> 
          </Route> 
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
