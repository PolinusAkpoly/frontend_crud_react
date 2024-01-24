/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 22/01/2024 18:57:08
*/
import React, { FC, Fragment, useEffect, useState } from 'react';
import './SearchBar.css';
import { capitalizeFirstLetter } from '../../helpers/utils';



interface SearchBarProps {
  handleSearch: any
  columns: any
  // setFilterCurrentPage: any
}


const SearchBar: FC<SearchBarProps> = ({ columns, handleSearch}) => {
  const [columnSelect, setColumnSelect] = useState<any[]>([]);
  const [searchValue, setSerchValue] = useState<string>('');
  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      setColumnSelect(columns.map((name: string, index: number) => {
        return {name: name, checked: index == 0 }
      }))
     }
    runLocalData()
  },[columns])



const handleSubmit = (event: any) => {
  event.preventDefault()
  const colChecked = columnSelect.filter(c => c.checked == true).map(c => c.name)
  handleSearch(colChecked, searchValue)
  // setFilterCurrentPage(colChecked, searchValue)
  }


  const handleSelect = (event: any, column: any) => {
    const {checked} = event.target 

    setColumnSelect(columnSelect.map((c) =>{
      if(c.name == column.name){
        c.checked = checked
      }
      return c
    }))
  
  }

  return (
    <Fragment>
      <div className="dropdown mr-2">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          filter by
        </button>
        <div className="dropdown-menu">
          {
            columnSelect ?

            columnSelect?.map((column: any) => {

                return <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"                 
                    onChange={(event) => handleSelect(event, column)}
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
      <div className="input-group">
        <form className='d-flex gap-1' onSubmit={handleSubmit}>
        <div className="form-outline" data-mdb-input-init>
          <input type="search" onChange={(e: any)=>setSerchValue(e.target.value)} id="form1" className="form-control"/>

        </div>
        <button type="button" onClick={handleSubmit} className="btn btn-primary" data-mdb-ripple-init>
          <i className="fas fa-search" />
        </button>
        </form>
       
      </div>
    </Fragment>
  );
}

export default SearchBar;