import React from 'react'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'

const storageName = 'userData'

export const Profile = () => {
    const [nameUser, setNameUser] = React.useState('')

    const {request} = useHttp()

    const data = JSON.parse(localStorage.getItem(storageName))

    const getName = async () => {
        const resData = await request('/auth/check', 'GET', null, {id: data.userId})
        return setNameUser(resData.name)
    }

    React.useEffect(() => {
        getName()// eslint-disable-next-line
    }, [])


    return (
        <div>
            <div className='profile-name-div'>
                {
                    nameUser
                        ?<b className='profile-name-b'>{nameUser}</b>
                        :<b className='profile-name-b'>Name</b>
                }
            </div>

            <NavLink to='/account/edit/name'>
                <button className='profile-button'><b>Edit profile</b></button>
            </NavLink>
        </div>
    )
}