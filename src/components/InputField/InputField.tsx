/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/01/2024 15:20:27
*/
import React, { FC, useEffect } from 'react';
import './InputField.css';
import { capitalizeFirstLetter } from '../../helpers/utils';


interface InputFieldProps {
  type?: string
  name: string
  defaultValue?: string
  placeholder?: string
  className?: string
  onChange: (e: any) => void
  value?:string
}


const InputField: FC<InputFieldProps> = ({ type, name, onChange, placeholder, defaultValue, className, value }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  },[])

  
  return (
    <div className="form-group m-1">
      <label htmlFor={name}> {capitalizeFirstLetter(name)} :</label>
      <input 
      onChange={onChange}
      className={className || ''} type={type || 'text'} 
      defaultValue={defaultValue} 
      name={name} 
      placeholder={placeholder || ''}
      value={value}
      />
      
    </div>

  );
}

export default InputField;