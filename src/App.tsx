import React  from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

// import { Dashboard } from './pages/Dashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import DataModel from './components/DataModel/DataModel';





const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/:entityName" element={<DataModel />} />
        {/* <Route path="/dashboard/:entityName" element={<Dashboard />} /> */}
      </Routes>

    </BrowserRouter>
  )
}

export default App
