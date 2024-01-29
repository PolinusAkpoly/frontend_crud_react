/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/01/2024 20:40:19
*/
import React, { FC, useEffect, useState } from 'react';
import './ComfirmDeleteModal.css';
import { getDatasById } from '../../api/entity';
import { capitalizeFirstLetter } from '../../helpers/utils';


interface ComfirmDeleteModalProps {
  modelId: string
  entityName: any
  deleteData:  any
}


const ComfirmDeleteModal : FC<ComfirmDeleteModalProps> = ({modelId, entityName, deleteData}) =>{
  const [data, setData] = useState<any>({})

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

        if (modelId && entityName) {
          let oneData = await getDatasById(entityName, modelId)
          if (oneData.isSuccess) {
            setData(oneData.result)
          }
      }

      }
      runLocalData()
    },[modelId])

  return (
    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">{data.title} {data.last_name} {data.first_name}  </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
       <strong> 
         are you sure to delete this  {capitalizeFirstLetter( entityName.slice(0, entityName.length - 1)) } 
       </strong> 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onClick={()=>deleteData(entityName, modelId)} className="btn btn-danger">Confirm Delete</button>
      </div>
    </div>
  </div>
</div>

  );
}

export default ComfirmDeleteModal;