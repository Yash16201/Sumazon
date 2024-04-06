import React from 'react'
import HeaderBar from './HeaderBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <HeaderBar/>
      <Outlet/>
    </>
  )
}

export default Layout