/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/01/2024 10:14:33
*/
import React, { FC, useEffect } from 'react';
import './ImageField.css';
import { capitalizeFirstLetter } from '../../helpers/utils';
import { Formik, Field, Form } from 'formik';


interface ImageFieldProps {
  type?: string
  name: string
  defaultValue?: string
  className?: string
  onChange: (e: any) => void
}


const ImageField : FC<ImageFieldProps> = ({ type, name, onChange,  defaultValue, className }) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  // return (
  //   <div className="form-group m-1">
  //   <label htmlFor={name}> {capitalizeFirstLetter(name)} :</label>
  //   <Field 
  //   onChange={onChange}
  //   className={className || ''} 
  //   type={type || 'file'} 
  //   defaultValue={defaultValue} 
  //   value={value}
  //   name={name} 
  //    />
  // </div>

  // );

  const handleSubmit = (values: any) => {
    // Gérer la soumission du formulaire ici
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ file: null }}
      onSubmit={handleSubmit}
    >
      <Form>
      <label htmlFor={name}> {capitalizeFirstLetter(name)} :</label>
     <Field 
     onChange={onChange}
     className={className || ''} 
     type={type || 'file'} 
     defaultValue={defaultValue} 
     
     name={name} 
      />
      </Form>
    </Formik>
  );


}

export default ImageField;


