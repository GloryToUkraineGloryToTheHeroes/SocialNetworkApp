import React from 'react'
import { useHttp } from '../../../hooks/http.hook'

const storageName = 'userData'

export const ProfilePosts = () => {
    const [profilePosts, setProfilePosts] = React.useState([])

    const {request} = useHttp()

    const data = JSON.parse(localStorage.getItem(storageName))

    const getPosts = async () => {
        try{
            const resData = await request('/files/posts/get', 'GET', null, {id: data.userId})
            setProfilePosts(resData)
        }catch(err){
            console.log(err)
        }
    }

    React.useEffect(() => {
        getPosts()
        // eslint-disable-next-line
    }, [])

    if(profilePosts.length === 0){
        return(
            <div className='else-profile-div-no-posts'>
                <b className='else-profile-b-no-posts'>You have no posts</b>
            </div>
        )
    }

    return (
        <div className='profile-posts-main-div'>
            {
                profilePosts.map(elem => (
                    
                    <div key={elem._id} className='profile-posts-elem-div-parent'>
                        <div className='profile-posts-elem-div-child-1'>
                            <div className='profile-posts-elem-div-child-2'>
                                <div className='profile-posts-elem-div-child-3'>
                                    <img src={`http://localhost:5000/${elem.image}`} alt='' className='profile-posts-elem-img'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                ))
            }
        </div>
    )
}