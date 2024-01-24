/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/01/2024 16:47:27
*/
import React, { FC, useEffect } from 'react';
import './FooterAdmin.css';


interface FooterAdminProps {
 
}


const FooterAdmin : FC<FooterAdminProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
    <footer className="main-footer">
  <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
  All rights reserved.
  <div className="float-right d-none d-sm-inline-block">
    <b>Version</b> 3.1.0
  </div>
</footer>

  );
}

export default FooterAdmin;