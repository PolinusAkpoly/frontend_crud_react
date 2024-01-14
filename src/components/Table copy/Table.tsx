/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 11/01/2024 14:09:42
*/
import React, { FC, useEffect } from 'react';
import './Table.css';
import { Post } from '../../models/Post';
import { Link } from 'react-router-dom';



interface TableProps {
  posts: Post[]
}


const Table : FC<TableProps> = ({posts}) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="Table">
         <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
           {
       posts.length?
       posts.map((post: Post )=><tr key={post._id}>
            <th scope="row">{post.position}</th>
            <td>{post.title}</td>
            <td>{post.description}</td>
            <td>
              <div className="d-flex gap-1">
                <Link to={"/post/"+ post._id} className="btn btn-success">View</Link>
                <Link to={"/post/edit/"+ post._id} className="btn btn-primary">Edit</Link>
                <a href="" className="btn btn-danger">Delet</a>
              </div>
            </td>
          </tr>)
       :
       null
      } 

          

{/*           
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <div className="d-flex gap-1">
                <a href="" className="btn btn-success">View</a>
                <a href="" className="btn btn-primary">Edit</a>
                <a href="" className="btn btn-danger">Delet</a>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <div className="d-flex gap-1">
                <a href="" className="btn btn-success">View</a>
                <a href="" className="btn btn-primary">Edit</a>
                <a href="" className="btn btn-danger">Delet</a>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <div className="d-flex gap-1">
                <a href="" className="btn btn-success">View</a>
                <a href="" className="btn btn-primary">Edit</a>
                <a href="" className="btn btn-danger">Delet</a>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <div className="d-flex gap-1">
                <a href="" className="btn btn-success">View</a>
                <a href="" className="btn btn-primary">Edit</a>
                <a href="" className="btn btn-danger">Delet</a>
              </div>
            </td>
          </tr>
       
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <div className="d-flex gap-1">
                <a href="" className="btn btn-success">View</a>
                <a href="" className="btn btn-primary">Edit</a>
                <a href="" className="btn btn-danger">Delet</a>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <div className="d-flex gap-1">
                <a href="" className="btn btn-success">View</a>
                <a href="" className="btn btn-primary">Edit</a>
                <a href="" className="btn btn-danger">Delet</a>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <div className="d-flex gap-1">
                <a href="" className="btn btn-success">View</a>
                <a href="" className="btn btn-primary">Edit</a>
                <a href="" className="btn btn-danger">Delet</a>
              </div>
            </td>
          </tr> */}
         
        </tbody>
      </table>
      </div>
  );
}

export default Table;