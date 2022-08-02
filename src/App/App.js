import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import LogingSection from "../pages/Loging";
import SignUp from "../pages/Loging/SignUp";
import DashBoard from "../pages/DashBoard";
import User from "../pages/User";
import Product from "../pages/Product";
import Cart from "../pages/cart";
import MainDash from "../pages/Main/index";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LogingSection/>}/>
          <Route exact path='signUp' element={<SignUp/>}/>
          <Route exact path='main' element={<MainDash/>}/>
          <Route exact path='dash' element={<DashBoard/>}/>
          <Route exact path='user' element={<User/>}/>
          <Route exact path='product' element={<Product/>}/>
          <Route exact path='cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
