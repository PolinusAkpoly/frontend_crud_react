import React  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Dashboard } from './pages/Dashboard/Dashboard';
import { Home } from './pages/Home';



const App: React.FC = () => {




  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:entityName" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
