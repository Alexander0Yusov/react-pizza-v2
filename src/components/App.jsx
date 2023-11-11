import './scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Cart from 'pages/Cart';

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
