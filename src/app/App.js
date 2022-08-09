import * as React from "react";
import Login from "../pages/Login";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route path="signup" element={<User/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="product" element={<Products/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        /*<Login/>*/
        /*<Dashboard/>*/
        /*<User/>*/
        /*<Products/>*/
        /*<Cart/>*/
    );
}

export default App;
