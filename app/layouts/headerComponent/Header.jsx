'use client';
import React, { useEffect, useState } from 'react';
import Title from '../titleComponent/Title';
import Navbar from '../navbarComponent/Navbar';

export default function Header () {

    let [logued, setLogued] = useState(null)
    setLogued(sessionStorage.getItem('token'));
    
    return(
        <React.Fragment>
            {logued != null &&             
                <Navbar /> 
            }
            {logued == null &&
                <Title /> 
            }
        </React.Fragment>
    );  
    
}
