import React from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { useNavigate } from 'react-router-dom'

const storageName = 'userData'

export const EditName = () => {
    const [name, setName] = React.useState('')
    const [pass, setPass] = React.useState('')// eslint-disable-next-line
    const [correct, setCorrect] = React.useState(false)

    const {request} = useHttp()

    const data = JSON.parse(localStorage.getItem(storageName))

    const getName = async () => {
        const resData = await request('/auth/check', 'GET', null, {id: data.userId})
        return setName(resData.name)
    }

    React.useEffect(() => {
        getName()// eslint-disable-next-line
    }, [])

    const sendData = {
        name: name,
        password: pass
    }

    const navigate = useNavigate()

    const sendForm = async () => {
        try{
            const resData = await request('/auth/account/edit/name', 'POST', sendData, {id: data.userId})
            setCorrect(resData.correct)
            navigate('/account')
        }catch(err){
            console.log(err)
        }
    }


    return(
        <div>
            <div className='edit-profile-div-main-b center'>
                <b className='edit-profile-main-b'>Edit name</b>
            </div>

            <div className='edit-name-div-p'>
                <b className='edit-profile-p-b'>Present name</b>
            </div>
            <input 
                type='text' 
                name='name'
                placeholder='name'
                defaultValue={name}
                onChange={e => setName(e.target.value)}
            />
            <div className='edit-name-div-p'>
                <b className='edit-profile-p-b'>Enter present password</b>
            </div>
            <input 
                type='password' 
                name='pass'
                placeholder='password'
                defaultValue={pass}
                onChange={e => setPass(e.target.value)}
            />

            
            
            <button className='edit-profile-button-name' onClick={sendForm}><b>Confirm</b></button>
            
        </div>
    )
}
