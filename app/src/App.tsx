import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import Header from './components/ui/Header';
import './components/css/stylesGeneral.css'
import OneBookPage from './components/pages/OneBookPage';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/:bookId' element={<OneBookPage />} />
      </Routes>
    </>
  );
}

export default App;
