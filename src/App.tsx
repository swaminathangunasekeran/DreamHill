import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import Project from './components/Projects/Projects';


function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/project" element={<Project />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

