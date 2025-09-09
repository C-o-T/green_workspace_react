import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderLayout from './layout/HeaderLayout'; 
import Home from './pages/Home';
import CarManagement from './pages/CarManagement';
import SalesInfoReg from './pages/SalesInfoReg';
import SalesList from './pages/SalesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HeaderLayout />}>
          <Route index element={<Home />} /> 
          <Route path='car-management' element={<CarManagement />} />\
          <Route path='sales-registration' element={<SalesInfoReg />} />
          <Route path='sales-list' element={<SalesList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;