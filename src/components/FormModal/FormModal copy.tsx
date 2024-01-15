/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/01/2024 18:51:03
*/
import React, { FC, useEffect } from 'react';
import './FormModal.css';
import { Button, Modal } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../helpers/utils';


interface FormModalProps {
  columns: any[]
  handleClose: () => void
}


const FormModal: FC<FormModalProps> = ({ columns, handleClose }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      console.log({ columns });

    }
    runLocalData()
  }, [])

  return (
    <div className="FormModal">
      <div>

        <Modal size='lg'
          centered show={true}
          onHide={handleClose}>
          <Modal.Body>
            <form action="">
              {
                columns?.map((column) =>{
                  return  <div className='form-group m-1'>
                    <input className='form-control' name={column.name} placeholder={capitalizeFirstLetter(column.name)+' ...'} />
                  </div>
                  
                })
              }


            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default FormModal;