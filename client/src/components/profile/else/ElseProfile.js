import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import defaultAvatar from '../../../assets/default.jpg'
import { ElseProfilePosts } from '../posts/ElseProfilePosts'

const storageName = 'userData'

export const ElseProfile = () => {
    const [userName, setUserName] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [renderAdd, setRenderAdd] = React.useState(true)

    const paramsId = useParams().id

    const navigate = useNavigate()

    const {request} = useHttp()

    const data = JSON.parse(localStorage.getItem(storageName))

    const getUser = async () => {
        try{
            const resData = await request('/auth/check', 'GET', null, {id: paramsId})
            if(resData._id === data.userId){
                navigate('/account')
            }
            setUserName(resData.name)
            setUserAvatar(resData.avatar)
        }catch(err){
            console.log(err)
        }
    }

    const addChat = async () => {
        try{
            const body = {
                chatId: paramsId,
                id: data.userId
            }
            
            await request('/auth/chats/add/user', 'POST', body, {})

            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const navigateToChat = () => {
        navigate(`/chats/users/${data.userId}/${paramsId}`)
    }


    const checkChat = async () => {
        try{
            const body = {
                chatId: paramsId,
                id: data.userId
            }

            const resData = await request('/auth/chats/check/user', 'POST', body, {})

            setRenderAdd(!resData)
        }catch(err){
            console.log(err)
        }
    }


    React.useEffect(() => {
        setUserName('')
        setUserAvatar('')
        getUser()
        checkChat()
        // eslint-disable-next-line
    }, [])


    if(renderAdd){
        return (
            <div className='main-page-main-div-1'>
                <div className='main-page-main-div-2'>
                    <div className='main-page-main-div-3'>
                        <div className='main-page-main-div-4'>
                            <div className='image-div'>
                                {
                                    userAvatar
                                    ?<img src={`http://localhost:5000/${userAvatar}`} alt='' className='image'></img>
                                    :<img src={defaultAvatar} alt='' className='image'></img>
                                }
                            </div>
                        </div>
                        <div >
                            <div className='profile-name-div'>
                                <b className='profile-name-b'>{userName}</b>
                            </div>
                            <button className='else-profile-button-send' onClick={navigateToChat}><b>Send message</b></button>
                            <button className='else-profile-button-send' onClick={addChat}><b>Add chat</b></button>
                        </div>
                    </div>

                    <div className='main-page-publication-div'>
                        <div className='main-page-publication-div-child'>
                            <b className='main-page-publication-b'>Publications</b>
                        </div>
                    </div>

                    <div className='main-page-posts-div'>
                        <ElseProfilePosts userId={paramsId} />
                    </div>

                </div>
            </div>
        )
    }else{
        return (
            <div className='main-page-main-div-1'>
                <div className='main-page-main-div-2'>
                    <div className='main-page-main-div-3'>
                        <div className='main-page-main-div-4'>
                            <div className='image-div'>
                                {
                                    userAvatar
                                    ?<img src={`http://localhost:5000/${userAvatar}`} alt='' className='image'></img>
                                    :<img src={defaultAvatar} alt='' className='image'></img>
                                }
                            </div>
                        </div>
                        <div>
                            <div className='profile-name-div'>
                                <b className='profile-name-b'>{userName}</b>
                            </div>
                            <button className='else-profile-button-send' onClick={navigateToChat}><b>Send message</b></button>
                        </div>
                    </div>

                    <div className='main-page-publication-div'>
                        <div className='main-page-publication-div-child'>
                            <b className='main-page-publication-b'>Publications</b>
                        </div>
                    </div>

                    <div className='main-page-posts-div'>
                        <ElseProfilePosts userId={paramsId} />
                    </div>

                </div>
            </div>
        )
    }

    
}

