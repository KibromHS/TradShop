import React from 'react';
import './Admin.css';
import { AddProduct, ListProduct, Sidebar } from '../../components';
import { Routes, Route } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="admin">
        <Sidebar />
        <Routes>
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/list-product' element={<ListProduct />} />
        </Routes>
    </div>
  )
}

export default Admin;