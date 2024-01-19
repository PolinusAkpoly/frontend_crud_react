/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/01/2024 15:20:28
*/
import React, { FC, useEffect } from 'react';
import './SelectField.css';
import { capitalizeFirstLetter } from '../../helpers/utils';


interface SelectFieldProps {
  name: string
  options: { value: string, name: string }[]
  value?: string
  defaultValue?: string
  className?: string
  onChange: (e: any) => void
}


const SelectField: FC<SelectFieldProps> = ({ name, value, options, defaultValue, className, onChange }) => {

// console.log(options);


  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="form-group m-1">
       <label htmlFor={name}> {capitalizeFirstLetter(name)} :</label>
      <select name={name} value={value} onChange={onChange} defaultValue={defaultValue} className={className}>
        {
        options ?
        options.map((option) => {
          return <option value={option.value}>{option.name}</option>
        })
        :
        null
        }

      </select>
    </div>

  );
}

export default SelectField;