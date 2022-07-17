import React from 'react'
import { useHttp } from '../../hooks/http.hook'
import defaultAvatar from '../../assets/default.jpg'
import { useNavigate } from 'react-router-dom'

const storageName = 'userData'

export const ChatTable = () => {
    const [chats, setChats] = React.useState([])

    const {request} = useHttp()

    const data = JSON.parse(localStorage.getItem(storageName))

    const getChats = async () => {
        try{
            const resData = await request('/auth/chats/get/user', 'GET', null, {id: data.userId})

            setChats(resData)
        }catch(err){
            console.log(err)
        }
    }

    const navigate = useNavigate()

    const navigateToChat = (paramsId) => {
        navigate(`/chats/users/${data.userId}/${paramsId}`)
    }


    React.useEffect(() => {
        getChats()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='chats-table-main-div-parent'>
                <b className='chats-table-main-b'>Chats</b>
            </div>
            <div className='chats-table-div center'>
                <div className='chats-table-div-table'>
                    {
                        chats.map(elem => (
                            <div key={elem._id} 
                                onClick={() => navigateToChat(elem._id)}
                                className='chats-table-elem'
                            >
                                
                                {
                                    elem.avatar
                                        ?<img alt='' src={`http://localhost:5000/${elem.avatar}`} className='chats-table-elem-image'/>
                                        :<img alt='' src={defaultAvatar} className='chats-table-elem-image'/>
                                }

                                <div><b>{elem.name}</b></div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}
