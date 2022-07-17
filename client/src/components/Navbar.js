import React from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { Finder } from './Finder'

export const Navbar = () => {

    const auth = React.useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()

    }

    return(
        <nav>
            <div className="nav-wrapper #212121 grey darken-4 navbar">
                <a href="/" className="brand-logo"><b className='nav-b'>Notesgram</b></a>

                <Finder />
                
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/account'><b className='nav-b'>Account</b></NavLink></li>
                    <li><NavLink to='/chats/table/users'><b className='nav-b'>Chats</b></NavLink></li>
                    <li><NavLink to='/chat/global'><b className='nav-b'>Global</b></NavLink></li>
                    <li><NavLink to='/account/posts/add'><b className='nav-b'>Add</b></NavLink></li>
                    <li><div onClick={logoutHandler} className='div-nav-b'>
                        <div className='div-small-nav-b'>
                            <b className='nav-b-l'>Logout</b>
                        </div>
                    </div></li>
                </ul>
            </div>
        </nav>
    )
}