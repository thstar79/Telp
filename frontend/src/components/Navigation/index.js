import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({isLoaded}){
    const sessionUser = useSelector(state=>state.session.user);

    let sessionLinks;
    if(sessionUser) {
        sessionLinks = (
            <ProfileButton user = {sessionUser} />
        );
    }
    else {
        sessionLinks = (
            <>
                <li>
                    <NavLink to='/login' style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'red', textDecoration: 'none'}}>Log In</NavLink>
                </li>
                <li>
                    <NavLink to='/signup'  style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'red', textDecoration: 'none'}}>Sign Up</NavLink>
                </li>
            </>
        );
    }

    return (
        <div className='topMenu'>
            <ul>
                {isLoaded && sessionLinks}
                <li>
                    <NavLink exact to="/business" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'red', textDecoration: 'none'}}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/business/signup' style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'red', textDecoration: 'none'}}>Register a Business</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navigation;