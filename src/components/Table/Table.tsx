/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 11/01/2024 14:09:42
*/
import React, { FC, useEffect, useState } from 'react';
import './Table.css';
import { Link, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter, filterTableData } from '../../helpers/utils';
import { getItem, setItem } from '../../services/localstorage.service';
import Pagination from '../Pagination/Pagination';
import { getDatasPerPage } from '../../api/entity';
import FormModal from '../FormModal/FormModal';




interface TableProps {
  entityName?: string
  currentPage: number
}
interface IColumn {
  name: string,
  checked: boolean,
}


const Table: FC<TableProps> = ({ entityName, currentPage }) => {


  const navigate = useNavigate();
  const [datas, setDatas] = useState<any>(null);
  const [isCreateData, setIsCreateData] = useState<boolean>(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [datasPerPage, setDatasPerPage] = useState((window as any).localStorage.getItem('perPage') || 5);

  let storedPosts = []

  if (entityName)
    storedPosts = getItem(entityName);

  const [columns, setColumns] = useState<IColumn[]>(storedPosts);
 
  console.log(columns);

  useEffect(() => {

    const runLocalData = async () => {
      window.scrollTo(0, 0)
      if (entityName) {
        let newDatas = await getDatasPerPage(entityName, currentPage, datasPerPage)
        setDatas(newDatas)
        if (newDatas?.results?.length) {

          if (columns && columns.length) {
            setColumns(columns)
          } else {
            const first = newDatas.results[0]
            delete first?._id
            delete first?.__v
            console.log(first);
            
            setColumns(Object.keys(first).map((value: string, index: number) => {
              return { 'name': value, 'checked': index < 1 }
            }))
          }
        }
      }

    }
    runLocalData()
  }, [currentPage,entityName, datasPerPage, datas?.results?.length])

  const handleSelect = (event: any, column: string) => {
    const { checked } = event.target
    let newValue = columns
    // console.log(checked);

    newValue = newValue.map((columnElement: IColumn) => {
      if (columnElement.name == column) {
        columnElement.checked = checked
      }
      return columnElement

    })
    if (entityName)
      setItem(entityName, newValue)
    setColumns(newValue)
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(datas?.allCount / datasPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log({ datas });
  console.log({ pageNumbers });

  const setCurrentPage = (newPage: number) => {
    console.log({ newPage });
    navigate(`/dashboard/${entityName}?page=${newPage}`);
  };

  return (
    <div className="Table">
      <div className="d-flex justify-content-between">
      <button onClick={()=>setIsCreateData(!isCreateData)} className="btn btn-success">Create</button>
        {
          pageNumbers.length > 1 ?
            <Pagination
              currentPage={currentPage}
              pageNumbers={pageNumbers}
              handleSelect={setCurrentPage}
            />
            :
            null
        }
        {
          isCreateData ?
          <FormModal 
          handleClose={()=>setIsCreateData(false)} 
          columns={columns} />
          :
          null
        }
        <div className='d-flex gap-1'>
          <select name="dataPerPage" onChange={(e)=>setDatasPerPage(e.target.value)} className='form-control' id="dataPerPage">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
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
                        onClick={(event) => handleSelect(event, column.name)}
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

      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
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
            datas?.results?.length ?
              datas.results?.map((data: any, index: number) => {
                // console.log(data._id);

                return <tr key={data._id}>
                  <td scope="row"> {datas.allCount - (datas.current - 1) * datasPerPage - index} </td>
                  {
                    columns ?
                      columns.filter(column => column.checked).map((column: IColumn) => {
                        return <td scope="row">
                          <div dangerouslySetInnerHTML={{ __html: filterTableData(column.name, data[column.name]) }} />

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