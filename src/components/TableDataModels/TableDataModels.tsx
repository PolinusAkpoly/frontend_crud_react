/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/01/2024 12:33:11
*/
import React, { FC, useEffect, useState } from 'react';
import './TableDataModels.css';
import {  useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter, filterTableData } from '../../helpers/utils';
import { getItem, setItem } from '../../services/localstorage.service';
import Pagination from '../Pagination/Pagination';
import { deleteDatasById, getDatasPerPage, searchData } from '../../api/entity';
import FormModal from '../FormModal/FormModal';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import ComfirmDeleteModal from '../ComfirmDeleteModal/ComfirmDeleteModal';


interface TableDataModelsProps {
  entityName?: string
  currentPage: number
  search: string
}
interface IColumn {
  name: string,
  checked: boolean,
}

const TableDataModels: FC<TableDataModelsProps> = ({ entityName, currentPage, search }) => {


  const navigate = useNavigate();
  const [datas, setDatas] = useState<any>(null);
  const [datasList, setDatasList] = useState<any>(null);
  const [isCreateData, setIsCreateData] = useState<boolean>(false);
  const [isUpdateData, setIsUpdateData] = useState<boolean>(false);
  const [isConfirmDeleteData, setIsConfirmDeleteData] = useState<boolean>(false);
  const [modelId, setModelId] = useState<string>("");
  const [datasPerPage, setDatasPerPage] = useState((window as any).localStorage.getItem('perPage') || 5);
  // const [searchUri, setSearchUri] = useState<string>("");



  let storedPosts = []

  if (entityName)
    storedPosts = getItem(entityName);

  const [columns, setColumns] = useState<IColumn[]>(storedPosts);

  // console.log(columns);



  useEffect(() => {

    const runLocalData = async () => {
      window.scrollTo(0, 0)
      if (entityName) {
        storedPosts = getItem(entityName);
        let newDatas
        if(search){
            let params: any = search.split(',')
            if(params.length){
              params = params.join('&')
              newDatas = await searchData(entityName,params, currentPage, datasPerPage)
            }else{
              newDatas = await getDatasPerPage(entityName, currentPage, datasPerPage)
              console.log(newDatas);
              
            }
        }else{
          newDatas = await getDatasPerPage(entityName, currentPage, datasPerPage)
        }
         
        setDatasList(newDatas)
        setDatas(newDatas.results)
        if (datas) {
          if (storedPosts) {
            setColumns(storedPosts)
          } else {
            const first = datas[0]
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
  }, [entityName, currentPage,search, datasPerPage])

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
  for (let i = 1; i <= Math.ceil(datasList?.allCount / datasPerPage); i++) {
    pageNumbers.push(i);
  }



  const setCurrentPage = (newPage: number) => {
    navigate(`/dashboard/${entityName}?page=${newPage}`);
  };


  const handleSearch = (columnSelected: any, tag: any) => {

    let result = "?search="

    let params = columnSelected.map((name: string) => `${name}=${tag}`);

    result += params.join(',') 
    navigate("/dashboard/" + entityName + result)
    // setSearchUri(result)

  };

  const openEditModal = (id: any) =>{
  setIsUpdateData(!isUpdateData)
  setModelId(id)
 }
  const openConfirmDeleteModal = (id: any) =>{
    setIsConfirmDeleteData(true)
    setModelId(id)
  }
  const handleClose = ()=>{
    setIsCreateData(false)
    setIsUpdateData(false)
    setModelId('')
  }
 const deleteData = async (entyName: string, modId: string)=>{
    console.log(entyName , modId);
    if(entyName && modId){      
      const result = await deleteDatasById(entyName , modId)
      console.log(result);
         if (result.isSuccess) {
          setIsConfirmDeleteData(false)
          setModelId('')
         }


      }
     
    
  }
  return (
    <div className="content-wrapper">
      {/* <!-- Content Header (Page header) --> */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-3">
              <h1> {entityName ? capitalizeFirstLetter(entityName) : ""} </h1>

            </div>

            <div className="col-sm-6 d-flex ">

              {/* searche input */}
              <SearchBar columns={columns.map(c => c.name)} handleSearch={handleSearch} />

            </div>

            <div className="col-sm-3">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li className="breadcrumb-item active">{entityName ? capitalizeFirstLetter(entityName) : ""}</li>
              </ol>
            </div>
          </div>
        </div>
        {/* <!-- /.container-fluid --> */}
      </section>

      {/* <!-- Main content --> */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Data {entityName ? capitalizeFirstLetter(entityName) : ""} with minimal features & hover style</h3>
                </div>
                {/* <!-- /.card-header --> */}
                <div className="card-body">

                  <div className="d-flex justify-content-between">
                    <button onClick={() => setIsCreateData(!isCreateData)} className="btn btn-success mb-2">Create</button>

                    {
                      isCreateData || isUpdateData?
                        <FormModal
                          handleClose={handleClose} 
                          columns={columns}
                          entityName={entityName}
                          modelId={modelId}
                        />
                        :
                        null
                    }

                   {
                      isConfirmDeleteData ?
                        <ComfirmDeleteModal modelId={modelId} entityName={entityName} deleteData={deleteData}/>
                                           
                        :
                        null
                    }



                    <div className='d-flex gap-1 '>
                      <select name="dataPerPage" onChange={(e) => setDatasPerPage(e.target.value)} className='form-control' id="dataPerPage">
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
                                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{capitalizeFirstLetter(column.name)}</label>
                                </div>
                              })
                              :
                              null
                          }

                        </div>
                      </div>
                    </div>

                  </div>

                  <table id="example2" className="table table-bordered table-hover">
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
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        datas?.length ?
                          datas?.map((data: any, index: number) => {
                            // console.log(data._id);

                            return <tr key={data._id}>
                              <td scope="row"> {datasList.allCount - (datasList.current - 1) * datasPerPage - index} </td>
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
                              <td>
                                <div className="d-flex gap-1">
                                  <Link to={"/dashboard/view/" + entityName + "/" + data._id} className="btn btn-success">View</Link>
                                  <Link onClick={() => openEditModal(data._id)} to={'#'} className="btn btn-primary">Edit</Link>                
                                  <Link to={'#'} onClick={()=>openConfirmDeleteModal(data._id)} className="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter">Delete</Link>
                                  

                                </div>
                              </td>
                            </tr>
                          })
                          :
                          null
                      }

                    </tbody>
                    <tfoot>
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
                        <th scope="col">Actions</th>
                      </tr>
                    </tfoot>
                  </table>
                  <div className='row'>
                    <div className='col-7'></div>
                    <div className='col-5 mt-2'>
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
                    </div>
                  </div>

                </div>
                {/* <!-- /.card-body --> */}
              </div>
              {/* <!-- /.card --> */}



            </div>



          </div>
          {/* <!-- /.row --> */}
        </div>
        {/* <!-- /.container-fluid --> */}
      </section>

      {/* pagination */}


    </div>

  );
}

export default TableDataModels;