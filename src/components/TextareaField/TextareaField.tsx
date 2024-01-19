/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/01/2024 15:20:28
*/
import React, { FC, useEffect } from 'react';
import './TextareaField.css';
import { capitalizeFirstLetter } from '../../helpers/utils';


interface TextareaFieldProps {
  name: string
  placeholder?: string
  className?: string
  value?: string
  onChange: (e: any) => void
}


const TextareaField: FC<TextareaFieldProps> = ({ name, value, placeholder, className, onChange }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="form-group m-1">
      <label htmlFor={name}> {capitalizeFirstLetter(name)} :</label>
      <textarea onChange={onChange} value={value} className={className || ''} name={name} placeholder={placeholder || ''} ></textarea>
    </div>

  );
}

export default TextareaField;