/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 11/01/2024 17:42:02
*/
import React, { FC, useEffect, useState } from 'react';
import './EditModel.css';
import { useParams } from 'react-router-dom';
import { Post } from '../../models/Post';
import { getDatasById } from '../../api/entity';
import FormPost from '../FormPost/FormPost';


interface EditModelProps {
 
}


const EditModel : FC<EditModelProps> = () =>{

  const id = useParams()._id
console.log(id);

  const [post, setPost] = useState<Post>();
  



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {
        if (id) {
          const data = await getDatasById("posts", id)
           console.log(data);
          if (data.isSuccess) {
            const currentPost: Post = data.result
            setPost(currentPost)
          }
        }
      }
      runLocalData()
    })

  return (
      <div className="EditPost">
         <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8">
            <h1> Edit Post number: {post?.position}</h1>
            {
              post? 
             <FormPost post = {post} />
              :
              null
            }
            
          </div>
          <div className="col-lg-4">

          </div>
        </div>
      </div>
      </div>
  );
}

export default EditModel;