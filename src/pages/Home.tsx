import React, { Fragment, useEffect } from 'react'
import Aside from '../components/Aside/Aside'
import DashboardComponent from '../components/DashboardComponent/DashboardComponent'






export const Home: React.FC = () => {


  

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
    }
    runLocalData()
  }, [])


  return (
    <Fragment>
      
      
      <div className="row">
        <div className="col-md">
          <Aside />
        </div>
        <div className="col-md-12">
          <DashboardComponent />
        
        </div>
      </div>

    </Fragment>
  )
}
