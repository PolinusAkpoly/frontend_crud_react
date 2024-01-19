import React  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import MyForm from './components/UplodImage/UplodImage';
import { Dashboard } from './pages/Dashboard/Dashboard';



const App: React.FC = () => {




  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<MyForm />} />
        <Route path="/dashboard/:entityName" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
