import React, { useState } from 'react'
import './style/navbar.css'
import images from '../assets/images'
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () =>{

    const [openShippment,setOpenShippment] = useState(false)
    return(
        <div className="navBarContainer">
            <a className='logo'>
                <img src={images.logo}/>
            </a>

            <div className="routesContainer">
                <NavLink className="routeButton">
                    <h1>Home</h1>
                </NavLink>

                <NavLink  className="routeButton" >
                    <h1>Prices</h1>
                </NavLink>

                <NavLink  className="routeButton">
                    <h1>Call Sales</h1>
                </NavLink>
            </div>

            <div className="routesContainer">

                <div className='track-shippment-container'>

               
                 <a  className={`routeButton track-shippment ${openShippment && 'opened'}`} onClick={()=>{
                    setOpenShippment(!openShippment)
                 }}>
                    <h1>Track Shippment</h1>

                
                </a>
                { openShippment && <div className='search-shippment-container'>

                        <div className='input-container'>
                            <h4>Track your shippment</h4>
                            <div className='input-search'>
                                <input placeholder='shippment number'/>
                                <img src={images.searchIcon}/>
                            </div>
                        </div>
                    </div>}
                     </div>
                    
                   <div className='seperator'/>

                <NavLink  className="routeButton">
                    <h1>Login</h1>
                </NavLink>
                

                <button className='language-button'>
                    ENG
                </button>
                
            </div>
        </div>
    )
}


export default NavBar