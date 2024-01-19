import React, { Fragment, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../helpers/utils';
import Table from '../../components/Table/Table';
// import { Button, Container, Row, Col, Table } from 'react-bootstrap';

export const Dashboard: React.FC = () => {


  const { entityName } = useParams()

  const location = useLocation();

  // Utiliser URLSearchParams pour extraire les paramètres de requête
  const params = new URLSearchParams(location.search);
  let page: any = params.get('page')

  if (page && parseInt(page)) {
    page = parseInt(page)
  } else {
    page = 1
  }


  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
    }
    runLocalData()
  }, [entityName])


  return (
    <Fragment>
      <div className="row">
        <div className="col-md-3">
          <ul className="list-group">
            <li className="list-group-item">
              <Link to="/dashboard/users">Users</Link>
            </li>
            <li className="list-group-item">
              <Link to="/dashboard/posts">Posts</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <h1> {entityName ? capitalizeFirstLetter(entityName) : ""} </h1>
          <div className="d-flex justify-content-between">


          </div>
          {/* <Table entityName={entityName} datas = {posts as any[]}/> */}
          <Table entityName={entityName} currentPage={page} />
        </div>
      </div>

    </Fragment>
  )
}
