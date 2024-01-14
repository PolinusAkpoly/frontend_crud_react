/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 11/01/2024 17:56:22
*/
import React, { FC, useEffect, useState } from 'react';
import './FormPost.css';
import { Post } from '../../models/Post';
import { convertImageToDataURL } from '../../helpers/utils';
import { updateData } from '../../api/entity';


interface FormPostProps {
  post: Post
}


const FormPost : FC<FormPostProps> = ({post}) =>{

  const [formValues, setFormValues] = useState<Post | any>({})
  console.log(formValues);


useEffect(() => {
  window.scrollTo(0,0)
  const runLocalData = async () => {

  }
  runLocalData()
},[post._id])


  const handleChange = async (event: any) => {
    const {name, value, files, checked, type} = event.target
    let newPost: any = formValues
    if(type === "text"){
      newPost = {...formValues, [name]: value}
  
    }
    else if(type === "checkbox"){
      newPost = {...formValues, [name]: checked}
      
    }
    else if(type === "file"){
      if(files.length){
        const file = files[0]
        if(file.type.startsWith("image/")){
          try {
            const imageUrl = await convertImageToDataURL(file)
        
          newPost = {...formValues, [name]: imageUrl}
            
          } catch (error) {
            
          }
        }
        
        
      }
      
    }
    setFormValues(newPost)

}

const handleSubmit = async (event: any) =>{
  event.preventDefault()
  
  const id = post._id.toString();
  

  const data = await  updateData("posts", id, formValues)
      // console.log(data);

      if (data.isSuccess) {
        console.log('donnees modifiees avec succes');
        
        
      }
  

 }
    

  return (
    <div className="container mt-4">
    <h2>Formulaire d'édite de Post</h2>
    <form onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label htmlFor="title">Titre :</label>
        <input type="text" onChange={handleChange} defaultValue={post?.title} name='title' className="form-control" id="title"  required />
      </div>

    
      <div className="form-group">
        <label htmlFor="description">Description :</label>
        <textarea onChange={handleChange} name='description' className="form-control" id="description"  defaultValue={post?.description} required></textarea>
      </div>

      
      <div className="form-group">
        <label htmlFor="content">Contenu :</label>
        <textarea onChange={handleChange} name='content' className="form-control" id="content"  defaultValue={post?.content} required></textarea>
      </div>

     
      <div className="form-group">
        <label htmlFor="imageUrl">URL de l'image :</label>
        <input type="file" onChange={handleChange} name='file' className="form-control" id="imageUrl" required />
      </div>

      
      <div className="form-group">
        <label htmlFor="position">Position :</label>
        <input type="number" onChange={handleChange} name='position' className="form-control" id="position" defaultValue={post?.position} required />
      </div>

      
      <div className="form-check">
        <input type="checkbox" onChange={handleChange} name='checkbox' className="form-check-input" id="isPublished" />
        <label className="form-check-label" htmlFor="isPublished">Publié</label>
      </div>

    
      <button type="submit" className="btn btn-primary mt-3">Soumettre</button>
    </form>
  </div>
  );
}

export default FormPost;