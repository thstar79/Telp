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
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </>
        );
    }

    return (
        <ul>
            <li>
            {isLoaded && sessionLinks}
                <NavLink exact to="/">Home</NavLink>
                <NavLink to='/business/signup'>Business SignUp</NavLink>
            </li>
        </ul>
    )
}

export default Navigation;