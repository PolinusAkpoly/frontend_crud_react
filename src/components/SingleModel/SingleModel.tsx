/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 11/01/2024 15:10:20
*/
import React, { FC, Fragment, useEffect, useState } from 'react';
import './SingleModel.css';
import { useParams } from 'react-router-dom';
import { Post } from '../../models/Post';
import { getDatasById } from '../../api/entity';
import { Link } from 'react-router-dom';
import Aside from '../Aside/Aside';


interface SingleModelProps {

}


const SingleModel: FC<SingleModelProps> = () => {

  // const id = useParams()._id
// console.log(id);
const { entityName, id } = useParams()

  const [post, setPost] = useState<Post>();
  // console.log(post);



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      if (id && entityName) {
          const data = await getDatasById(entityName, id)
        //  console.log(data);
        if (data.isSuccess) {
          const currentPost: Post = data.result
          setPost(currentPost)
        }
      }

    }
    runLocalData()
  },[])

  return (
    <Fragment>
      <div className="row">
      <div className="col-2">
      <Aside/>
      </div>
      <div className="SinglePost col-10">
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8">
            <h1>{post?.title}</h1>
            <p className="lead">{post?.description}</p>
            <img src={post?.imageUrl} className="img-fluid" alt="Image de l'article" />
            <p>{post?.description}</p>
          </div>
          <div className="col-lg-4">

            <p><Link to={"/dashboard/" + entityName} className="btn btn-success btnPost">Return to Posts</Link></p>
          </div>
        </div> 
      </div>
     </div>
    </div>
   
    </Fragment>
  );
}

export default SingleModel;