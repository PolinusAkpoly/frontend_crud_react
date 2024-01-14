/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 11/01/2024 14:09:42
*/
import React, { FC, useEffect, useState } from 'react';
import './Table.css';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter, filterTableData } from '../../helpers/utils';
import { getItem, setItem } from '../../services/localstorage.service';




interface TableProps {
  entityName?: string,
  datas: any[]
}
interface IColumn {
  name: string,
  checked: boolean,
}


const Table: FC<TableProps> = ({ datas, entityName }) => {




let storedPosts = [] 

if (entityName)
   storedPosts = getItem(entityName);

const [columns, setColumns] = useState<IColumn[]>(storedPosts);
console.log(columns);
  useEffect(() => {
    window.scrollTo(0, 0)
    if (datas.length) {
      
      if(columns && columns.length){
        setColumns(columns)
      }else{
        const first = datas[0]
        delete first?._id
        delete first?.__v
        setColumns(Object.keys(first).map((value: string, index: number) =>{
          return  {'name': value, 'checked': index < 1}
        }))
      }
    
      
    }
    const runLocalData = async () => {

    }
    runLocalData()
  },[datas.length])

  const handleSelect = (event: any, column: string) =>{
    const {checked} = event.target 
    let newValue = columns
    // console.log(checked);
    
    newValue = newValue.map((columnElement: IColumn)=>{
      if(columnElement.name == column){
        columnElement.checked = checked
      }
      return columnElement
       
    })
    if(entityName)
      setItem(entityName,newValue)
    setColumns(newValue)
  }

  return (
    <div className="Table">
      <div className="d-flex justify-content-end">
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Columns
        </button>
        <div className="dropdown-menu">
          {
            columns ?
              columns.map((column: IColumn) => {
                return <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" 
                  onClick={(event)=>handleSelect(event,column.name)}
                  checked={column.checked}
                  />
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{column.name}</label>
                </div>
              })
              :
              null
          }

        </div>
      </div>
      </div>
     
      <table className="table">
        <thead>
          <tr>

            {
              columns ?
                columns.filter(column => column.checked).map((column: IColumn) => {
                  return <th scope="col">{capitalizeFirstLetter(column.name)}</th>
                })
                :
                null
            }
            {/* {
              columns ?
                columns.map((column: string) => {
                  return <th scope="col">{column}</th>
                })
                :
                null
            } */}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            datas.length ?
              datas.map((data: any) => {
                // console.log(data._id);
                
                return <tr key={data._id}>
                  {
                    columns ?
                    columns.filter(column => column.checked).map((column: IColumn) => {
                        return <td scope="row">
                          <div dangerouslySetInnerHTML={{ __html:  filterTableData( column.name, data[column.name])}}/>
                          
                          </td>
                      })
                      
                      
                      :
                      null
                  }
                  {/* {
                    columns ?
                      columns.map((column: string) => {
                        return <th scope="row">{data[column]}</th>
                      })
                      :
                      null
                  } */}

                  <td>
                    <div className="d-flex gap-1">
                      <Link to={"/dashboard/" + entityName + "/" + data._id} className="btn btn-success">View</Link>
                      <Link to={"/dashboard/" + entityName + "/" + data._id} className="btn btn-primary">Edit</Link>
                      <a href="" className="btn btn-danger">Delet</a>
                    </div>
                  </td>
                </tr>
              })
              :
              null
          }
{/* /dashboard/:entityName/:_id" */}


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