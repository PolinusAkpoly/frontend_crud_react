/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/01/2024 14:54:07
*/
import React, { FC, useEffect } from 'react';
import './CreactDatas.css';
import { useParams } from 'react-router-dom';
// import FormCreactDatas from '../FormCreactDatas/FormCreactDatas';


interface CreactDatasProps {
 
}


const CreactDatas : FC<CreactDatasProps> = () =>{

  const { entityName } = useParams()

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="container">
          <h1>Creation page  {entityName} </h1>
          {/* < FormCreactDatas /> */}
      </div>
  );
}

export default CreactDatas;