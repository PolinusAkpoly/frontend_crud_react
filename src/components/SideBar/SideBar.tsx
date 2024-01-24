/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/01/2024 16:53:27
*/
import React, { FC, useEffect } from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';


interface SideBarProps {
 
}


const SideBar : FC<SideBarProps> = () =>{


  const navLinks = [
    {
      name: 'Post',
      link: '/posts',
      icon: 'nav-icon'
    },
    {
      name: 'User',
      link: '/users',
      icon: 'nav-icon'
    },
  ]

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
    <nav className="mt-2">
    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
      {/* Add icons to the links using the .nav-icon class
    with font-awesome or any other icon font library */}
        <li className="nav-item menu-open">
        <Link to={'/dashboard'} className="nav-link active">
          <i className="nav-icon fas fa-tachometer-alt" />
          <p>
            Models
            <i className="right fas fa-angle-left" />
          </p>
        </Link>
        <ul className="nav nav-treeview">
          {
            navLinks.map((item, index)=>{
              return <li key={index} className="nav-item">
              <Link to={'/dashboard'+ item.link} className="nav-link active">
                <i className={"far fa-circle "+item.icon} />
                <p>{item.name}</p>
              </Link>
            </li>
            })
          }
        </ul>
      </li>
      </ul>
   
  </nav>
  );
}

export default SideBar;