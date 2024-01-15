/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/01/2024 15:22:54
*/
import React, { FC, useEffect } from 'react';
import './FormCreactDatas.css';


interface FormCreactDatasProps {
  columns: any[]
}


const FormCreactDatas : FC<FormCreactDatasProps> = () =>{

const types = [
  "text",
  "textarea",
  "file",
  "number",
  "checkbox"
]

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

const generateInput = () =>{

for (let index = 0; index < types.length; index++) {
   const element = types[index];
if (element === "text") {
  return <input type="text"  name='title' className="form-control" required />
}
if (element === "textarea") {
  return <textarea name='description' className="form-control" id="description"   required></textarea>
}
if (element === "file") {
  return <input type="file"  name='file' className="form-control" id="imageUrl" required />
}
 if (element === "number") {
  return <input type="number"  name='position' className="form-control" id="position"  required />
}
if (element === "checkbox") {
  return <input type="checkbox"  name='checkbox' className="form-check-input" id="isPublished" />
} 


}

}





  return (
      <div className="FormCreactDatas">
         <form >
         {
        //  types?.map((t)=>generateInput(t))
         
         }
      
      <button type="submit" className="btn btn-primary mt-3">Soumettre</button>
    </form>
      </div>
  );
}

export default FormCreactDatas;