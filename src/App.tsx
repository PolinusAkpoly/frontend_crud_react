import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'

import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import SinglePost from './components/SinglePost/SinglePost';
import EditPost from './components/EditPost/EditPost';



const App: React.FC = () => {
  

  return (
    <BrowserRouter>
    

      <div className="container">
        <Routes>
        <Route path="/dashboard/:entityName" element={<Home />} />
        <Route path="/dashboard/:entityName/:_id" element={<SinglePost />} />
        <Route path="/dashboard/:entityName/:_id" element={<EditPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
