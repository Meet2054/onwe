import React from 'react';
import { Route, Routes,useLocation } from 'react-router-dom';
import Academia from '../src/components/middlecomponent/Academia';
import Artafashion from '../src/components/middlecomponent/Artafashion';
import Discussions from '../src/components/middlecomponent/Discussions';
import Literature from '../src/components/middlecomponent/Literature';
import Social from '../src/components/middlecomponent/Social';
import Sports from '../src/components/middlecomponent/Sports';
import Logohome from '../src/components/middlecomponent/Logohome';
import Leftcomponent from '../src/components/leftcomponent/Leftcomponent';
import Rightcomponent from '../src/components/rightcomponent/Rightcomponent';
import './App.css'; // Assuming you have a CSS file for custom styles
import Navbar from "./components/middlecomponent/Navbar"
import Login from './components/middlecomponent/Login';
import Signup from './components/middlecomponent/Signup';

const Home = () => {
  const location = useLocation();
  
  if (location.pathname==="/login"){
    return(
      <Login></Login>
    )
  }
  else if(location.pathname==="/signup"){
    return(
      <Signup></Signup>
    )
  }
  else{
    return (
      <div className='container-fluid full-width'>
        <div className='row'>
          <Leftcomponent />
          <div className='col-6 col-lg-7 middle-component border border-dark rounded'>
            <Navbar/>
            <Routes>
  
              <Route path='/' element={<Logohome />} />
              <Route path='/Social' element={<Social />} />
              <Route path='/Academia' element={<Academia />} />
              <Route path='/Literature' element={<Literature />} />
              <Route path='/Discussions' element={<Discussions />} />
              <Route path='/Sports' element={<Sports />} />
              <Route path='/Artafashion' element={<Artafashion />} />
            </Routes>
          </div>
          <Rightcomponent />
        </div>
      </div>
    );
  }
  
}

export default Home;
