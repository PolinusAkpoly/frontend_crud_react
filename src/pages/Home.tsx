import React, { Fragment, useEffect, useState } from 'react'
import Table from '../components/Table/Table'
import { getDatas } from '../api/entity'
import { Post } from '../models/Post'
import { useParams } from 'react-router-dom'
// import { Button, Container, Row, Col, Table } from 'react-bootstrap';

export const Home: React.FC = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const { entityName } = useParams()


  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      let data 
      if (entityName){
        data = await getDatas(entityName)
      }
      
      // console.log(data);

      if (data.isSuccess) {
        const currentPosts: Post[] = data.results
        setPosts(currentPosts)
      }

    }
    runLocalData()
  }, [])



  return (
    <Fragment>
      <h1>Posts</h1>
      <div className="d-flex justify-content-between">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">4</a></li>
          <li className="page-item"><a className="page-link" href="#">5</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
        <a href="" className="btn btn-success">Create</a>
      </div>
      <Table entityName={entityName} datas = {posts as any[]}/>
      
    </Fragment>
  )
}
