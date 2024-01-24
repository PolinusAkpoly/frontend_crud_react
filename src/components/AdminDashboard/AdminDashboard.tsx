/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 21/01/2024 16:18:19
*/
import React, { FC, Fragment, useEffect, useRef } from 'react';
import './AdminDashboard.css';
import Aside from '../Aside/Aside';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import FooterAdmin from '../FooterAdmin/FooterAdmin';


interface AdminDashboardProps {
 
}


const AdminDashboard : FC<AdminDashboardProps> = () =>{


  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Créer une nouvelle balise script
    const script = document.createElement('script');
    script.src = '/dist/js/pages/dashboard.js';
    script.async = true;

    // Stocker la référence à la balise script dans la référence useRef
    scriptRef.current = script;

    // Ajouter la balise script au DOM
    document.body.appendChild(script);

    // Nettoyer la balise script lors du démontage du composant
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []); // Le tableau vide [] signifie que cela ne dépend d'aucune variable, donc il ne s'exécute qu'une fois après le montage.




  return (
      <Fragment>
        <Aside />
        <ContentWrapper/>
        <FooterAdmin/>
      </Fragment>
  );
}

export default AdminDashboard;