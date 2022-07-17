import React from 'react'
import defaultAvatar from '../../assets/default.jpg'
import { useHttp } from '../../hooks/http.hook'

const storageName = 'userData'

export const AvatarImage = () => {
    const [avatar, setAvatar] = React.useState('')

    const {request} = useHttp()

    const data = JSON.parse(localStorage.getItem(storageName))

    const findAvatar = async () => {
        const getData = await request('/files/avatar/get', 'GET', null, {id: data.userId})
        return setAvatar(getData)
    }

    React.useEffect(() => {
        findAvatar()
        // eslint-disable-next-line
    }, [])

    /*
    
    Throw avatar in auth.hook, and after that in AuthContext
    If avatar will be in context it will not jumping after every loading

    */


    return (
        <div className='image-div'>
            {
                avatar 
                ?<img src={`http://localhost:5000/${avatar}`} alt='' className='image'></img>
                :<img src={defaultAvatar} alt='' className='image'></img>
            }
        </div>
    )
}