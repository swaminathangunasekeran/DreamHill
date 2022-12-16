import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Home } from './Home/Home';
import Contact  from './Contact/Contact';
import NavProvider from '../../context/NavContext';
import { Portfolio } from './Portfolio/Portfolio';
import { AboutUs } from './AboutUs/AboutUs';
import { Nav } from "./NavBar/Nav";
import Service from './Service/Service';


function Main() {
  return (
    <>
    <NavProvider>
      <Nav/>
      <Home/>
      <AboutUs/>
      <Service/>
      <Portfolio/>
      <Contact/>
    </NavProvider>
    </>

  );
}

export default Main;