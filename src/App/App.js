import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import LogingSection from "../pages/Loging";
import SignUp from "../pages/Loging/SignUp";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LogingSection/>}/>
          {/*<Route exact path='admin' element={<AdminPanel/>}/>*/}
          {/*<Route exact path='customer' element={<CustomerPanel/>}/>*/}
          {/*<Route exact path='driver' element={<DriverPanel/>}/>*/}
          <Route exact path='signUp' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
