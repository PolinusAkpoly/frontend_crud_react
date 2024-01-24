import React, { Fragment, useEffect } from 'react'

import DashboardComponent from '../components/DataModel/DataModel'






export const Home: React.FC = () => {


  

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
    }
    runLocalData()
  }, [])


  return (
    <Fragment>
          <DashboardComponent />
    </Fragment>
  )
}
