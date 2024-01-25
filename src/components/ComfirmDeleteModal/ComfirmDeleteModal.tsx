/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/01/2024 20:40:19
*/
import React, { FC, useEffect, useState } from 'react';
import './ComfirmDeleteModal.css';
import { getDatasById } from '../../api/entity';


interface ComfirmDeleteModalProps {
  modelId: string
  entityName: any
}


const ComfirmDeleteModal : FC<ComfirmDeleteModalProps> = ({modelId, entityName}) =>{
  const [data, setData] = useState<any>(null)


    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

        if (modelId && entityName) {
          let oneData = await getDatasById(entityName, modelId)
          let dataPerId = oneData.result
          setData(dataPerId)
          console.log(oneData);
          console.log(data);
      }

      }
      runLocalData()
    })

  return (
    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        {/* <h5 className="modal-title" id="exampleModalLongTitle">{data.title}</h5> */}
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Confirm Delete</button>
      </div>
    </div>
  </div>
</div>

  );
}

export default ComfirmDeleteModal;