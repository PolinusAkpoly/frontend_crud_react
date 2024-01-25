import React  from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import DataModel from './components/DataModel/DataModel';
import SingleModel from './components/SingleModel/SingleModel';






const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/:entityName" element={<DataModel />} />
        <Route path="/dashboard/view/:entityName/:id" element={<SingleModel />} />
        

      </Routes>

    </BrowserRouter>
  )
}

export default App
