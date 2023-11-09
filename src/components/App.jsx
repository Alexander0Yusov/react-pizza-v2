import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Cart from 'pages/Cart';
import React from 'react';

export const SearchContext = React.createContext();

export const App = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
};
