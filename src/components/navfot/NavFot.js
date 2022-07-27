import React from 'react'
import Footer from './footer/Footer'
import Navbar from './navbar/Navbar'

function NavFot({children}) {
  return (
    <div  
    style={{padding:'100px 0 0 0'}}
    >
    <Navbar/>
    {children}
    <Footer/>
    </div>
  )
}

export default NavFot