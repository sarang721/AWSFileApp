import React from 'react';
import {Routes, Route} from 'react-router-dom'

import Login from "./components/login";
import Signup from "./components/signup";
import Nav from "./components/profile"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Nav></Nav>}></Route>
      </Routes>
    </div>
  );
}

export default App;
