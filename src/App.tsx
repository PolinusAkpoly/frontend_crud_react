import React from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

import { Home } from './pages/Home'

import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import SinglePost from './components/SinglePost/SinglePost';
import EditPost from './components/EditPost/EditPost';
import CreactDatas from './components/CreactDatas/CreactDatas';
import { Link } from 'react-router-dom';



const App: React.FC = () => {
  const { entityName } = useParams()
console.log(entityName);

  return (
    <BrowserRouter>

{/* {currentPage === totalPageCount ? 'page-item disabled' : 'page-item'} */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="list-group">
            <Link to="/dashboard/users" className={`list-group-item list-group-item-action ${entityName === 'users' ? 'active' : ''}`}>
              Users
            </Link>

              <Link to={"dashboard/posts"} className="list-group-item list-group-item-action">
                Posts
              </Link>
            </div>
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/dashboard/:entityName" element={<Home />} />
              <Route path="/dashboard/:entityName/:_id" element={<SinglePost />} />
              <Route path="/dashboard/:entityName/:_id" element={<EditPost />} />
              <Route path="/dashboard/creact/:entityName" element={<CreactDatas />} />
            </Routes>
          </div>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App
