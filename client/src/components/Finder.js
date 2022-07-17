import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import defaultAvatar from '../assets/default.jpg'

export const Finder = () => {
    const [inputData, setInputData] = React.useState('')
    const [foundUsers, setFoundUsers] = React.useState([])

    const changeInputData = async e => {
        try{
            setInputData(e.target.value)
            findResult(e.target.value)
        }catch(err){
            console.log(err)
        }
    }

    const {request} = useHttp()

    const findResult = async (inputValue) => {
        try{
            const extra = []

            const data = {
                inputData: inputValue
            }

            //console.log(data.inputData)

            const found = await request('/auth/get/users', 'GET', null, {send: data.inputData})
            //console.log(found)
            if(found.length !== 0){// eslint-disable-next-line
                found.map(elem => {
                    extra.push(elem)
                })
            }else{
                extra.length = 0
            }

            setFoundUsers(extra)
        }catch(err){
            console.log(err)
        }
    }

    const closeFinder = () => {
        setInputData('')
        setFoundUsers([])
    }

    const navigate = useNavigate()

    const clickProfile = async (userId) => {
        try{
            closeFinder()
            navigate(`/account/else/${userId}`)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='finder-main-div-1'>
            <div className='finder-main-div-2 center'>
                <div className='finder-main-div-3'>
                    <div className='center'>
                        <input 
                            type='text' 
                            style={{background: 'white', borderRadius: '10px', margin: '0'}}
                            onChange={changeInputData}
                            value={inputData}
                        />
                        <button className='finder-button' onClick={closeFinder}><b>X</b></button>
                    </div>
                </div>
            </div>

            <div className='finder-main-elem-div'>
                {foundUsers.map(elem => (
                    <div className='finder-elem-div' key={elem._id} onClick={() => clickProfile(elem._id)}>
                        {
                            elem.avatar
                                ?<img alt='' src={`http://localhost:5000/${elem.avatar}`} className='finder-elem-image'/>
                                :<img alt='' src={defaultAvatar} className='finder-elem-image'/>
                        }

                        <div><b>{elem.name}</b></div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}