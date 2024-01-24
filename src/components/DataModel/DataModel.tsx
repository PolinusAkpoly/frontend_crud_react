/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 19/01/2024 17:27:59
*/
import React, { FC, Fragment, useEffect } from 'react';
import './DataModel.css';
import { useLocation, useParams } from 'react-router-dom';
import Aside from '../Aside/Aside';
import TableDataModels from '../TableDataModels/TableDataModels';




interface DataModelProps {

}


const DataModel: FC<DataModelProps> = () => {



  const { entityName } = useParams()

  const location = useLocation();

  // Utiliser URLSearchParams pour extraire les paramètres de requête
  const params = new URLSearchParams(location.search);
  let page: any = params.get('page')
  let search: any = params.get('search')

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
  }, [entityName, search])





  return (
    <Fragment>
      <Aside />
      <TableDataModels entityName={entityName} currentPage={page} search={search} />
    </Fragment>

  );
}

export default DataModel;