import './App.css';
import {BrowserRouter as Router, 
  Routes,
  Route}
   from 'react-router-dom';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Router>
        <Routes>
        <Route path='/' key = 'general' element={<News pageSize={9} country = {'in'} category = {'general'}/>}/>
          <Route path='/sports'  key = 'sports' element={<News pageSize={9} country = {'in'} category = {'sports'}/>}/>
          <Route path='/science'  key = 'science' element={<News pageSize={9} country = {'in'} category = {'science'}/>}/>
          <Route path='/entertainment' element={<News pageSize={9} country = {'in'} category = {'entertainment'}/>}/>
          <Route path='/health' element={<News pageSize={9} country = {'in'} category = {'health'}/>}/>
          <Route path='/technology' element={<News pageSize={9} country = {'in'} category = {'technology'}/>}/>
          <Route path='/business' element={<News pageSize={9} country = {'in'} category = {'business'}/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}

