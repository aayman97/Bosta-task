import React from 'react'
import './style/mainLayout.css'
import NavBar from './NavBar';


const MainLayout = ({children}) =>{
    return(
        <div className='mainLayoutContainer'>
            <NavBar>
                
            </NavBar>
            <div className='page-container'>
            {children}
            </div>
        </div>
        
    )
}


export default MainLayout