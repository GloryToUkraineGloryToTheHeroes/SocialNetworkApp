import React from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { useNavigate } from 'react-router-dom'

const storageName = 'userData'

export const EditPass = () => {
    const [oldPass, setOldPass] = React.useState('')
    const [firstPass, setFirstPass] = React.useState('')
    const [secondPass, setSecondPass] = React.useState('')

    const {request} = useHttp()

    const navigate = useNavigate()

    const sendData = {
        oldPass: oldPass,
        firstPass: firstPass,
        secondPass: secondPass
    }

    const data = JSON.parse(localStorage.getItem(storageName))

    const sendForm = async () => {
        try{
            const resData = await request('/auth/account/edit/password', 'POST', sendData, {id: data.userId})
            console.log(resData)
            navigate('/account')
        }catch(err){
            console.log(err)
        }
    }
    

    return(
        <div>
            <div className='edit-profile-div-main-b center'>
                <b className='edit-profile-main-b'>Edit pass</b>
            </div>
            
            <div className='edit-name-div-b'>
                <b className='edit-profile-p-b'>Present password</b>
            </div>
            <input 
                type='password'
                placeholder='present password'
                defaultValue={oldPass}
                onChange={e => setOldPass(e.target.value)}
            />

            <div className='edit-name-div-p'>
                <b className='edit-profile-p-b'>New password</b>
            </div>
            <input 
                type='password'
                placeholder='new password'
                defaultValue={firstPass}
                onChange={e => setFirstPass(e.target.value)}
            />

            <div className='edit-name-div-p'>
                <b className='edit-profile-p-b'>Confirm new password</b>
            </div>
            <input 
                type='password'
                placeholder='new password'
                defaultValue={secondPass}
                onChange={e => setSecondPass(e.target.value)}
            />
            
            <button className='edit-profile-button-name' onClick={sendForm}>Confirm</button>
        </div>
    )
}