import React,{useState} from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'

import {Routes,Route} from 'react-router-dom'
import './App.css'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<LandingPage></LandingPage>}/>

      </Routes>
      
    </div>
  )
}

export default App
