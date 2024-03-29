/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/01/2024 15:20:28
*/
import React, { FC, useEffect} from 'react';
import './SelectUser.css';
import { capitalizeFirstLetter } from '../../helpers/utils';



interface SelectUserProps {
  name: string
  options: { value: string, name: string }[]
  value?: string
  defaultValue?: string
  className?: string
  onChange: (e: any) => void
  multiple?: string
}


const SelectUser: FC<SelectUserProps> = ({ name, value, options, defaultValue, className, onChange, multiple }) => {
console.log(name);



// const deleteLastLetter = (str: string) => {
//   return str.slice(0, str.length);
// }



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      // setNames(name)
    }
    runLocalData()
  })

  return (
    <div className="form-group m-1">
      <label htmlFor={name}> {capitalizeFirstLetter(name)} :</label>
     {
      multiple? 
      <select name={name} value={value} onChange={onChange} defaultValue={defaultValue} className={className} multiple></select>
      :
      null
    }
      <select name={name} value={value} onChange={onChange} defaultValue={defaultValue} className={className} >

        {
        options ?
        options.map((option) => {
          return <option value={option.name}>{option.value}</option>
        })
        :
         null
        }

      </select>
    </div>

  );
}

        
export default SelectUser;