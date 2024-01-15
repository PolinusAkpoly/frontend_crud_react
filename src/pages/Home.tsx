import React, { Fragment, useEffect } from 'react'
import Table from '../components/Table/Table'
import { useLocation, useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '../helpers/utils'
// import { Button, Container, Row, Col, Table } from 'react-bootstrap';

export const Home: React.FC = () => {


  const { entityName } = useParams()

  const location = useLocation();

  // Utiliser URLSearchParams pour extraire les paramètres de requête
  const params = new URLSearchParams(location.search);
  let page: any = params.get('page') 

  if(page && parseInt(page)){
    page = parseInt(page)
  }else{
    page = 1
  }
  

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
    }
    runLocalData()
  }, [])


  return (
    <Fragment>
      <h1> {entityName ? capitalizeFirstLetter(entityName): ""} </h1>
      <div className="d-flex justify-content-between">
       
        
      </div>
      {/* <Table entityName={entityName} datas = {posts as any[]}/> */}
      <Table entityName={entityName} currentPage={page} />
    </Fragment>
  )
}
