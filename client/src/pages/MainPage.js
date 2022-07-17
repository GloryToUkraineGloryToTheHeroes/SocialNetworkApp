import React from 'react'
import { Loader } from '../components/Loader'
import { useHttp } from '../hooks/http.hook'

import { NavLink } from 'react-router-dom'
import { AvatarImage } from '../components/avatar/AvatarImage'
import { Profile } from '../components/profile/your/Profile'
import { ProfilePosts } from '../components/profile/posts/ProfilePosts'

function MainPage(){

    const {loading} = useHttp()

    if(loading){
        return <Loader />
    }

 

    /*

    instead of pictures will be songs
    <img src={defaultAvatar} alt='' style={{width: '100px', height: '100px'}}></img>

    */


    /*
    
    Rewrite all styles
    Write to them classNames, and then write styles in css file

    If someone wants change his pass he need to write correct present pass

    RENAME PROJECT 'FRONT-END-HUB'

    DESIGN LIKE ON FAMOUS SITE
    
    */
    return (
        <div className='main-page-main-div-1'>
            <div className='main-page-main-div-2'>
                <div className='main-page-main-div-3'>
                    <div className='main-page-main-div-4'>
                        <NavLink to='/avatar/change'>
                            <AvatarImage />
                        </NavLink>
                    </div>
                    <div>
                        <Profile />
                    </div>
                </div>
        
                <div className='main-page-publication-div'>
                    <div className='main-page-publication-div-child'>
                        <b className='main-page-publication-b'>Publications</b>
                    </div>
                </div>

                <div className='main-page-posts-div'>
                    <ProfilePosts />
                </div>
            </div>
        </div>
    )
}

export default MainPage