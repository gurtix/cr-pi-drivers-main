// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import Landing from './landing/Landing';
import Home from './home/Home';
import Detail from './detail/Detail';
import Create from './create/Create.jsx';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />        
        </Routes>
      </div>
    </BrowserRouter>
      
  )
}

export default App
