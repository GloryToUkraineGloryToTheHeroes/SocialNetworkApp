import React from 'react'
import { fireDB } from '../../config/firebase.config' 
//import { set, ref, onValue, update } from 'firebase/database'
import { collection, setDoc, getDocs, doc } from 'firebase/firestore'
import { uid } from 'uid'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../../components/Loader'

const storageName = 'userData'

export const ChatPage = () => {
    const [inputMessage, setInputMessage] = React.useState('')
    const [messages, setMessages] = React.useState([])
    const [userName, setUserName] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [loading, setLoading] = React.useState(true)

    const {request} = useHttp()

    const data = JSON.parse(localStorage.getItem(storageName))// eslint-disable-next-line

    const getName = async () => {
        setLoading(true)
        const resData = await request('/auth/check', 'GET', null, {id: data.userId})
        setUserAvatar(resData.avatar)
        setUserName(resData.name)
        setLoading(false)
        return resData
    }

    const changeValue = (e) => {
        setInputMessage(e.target.value)
    }

    const sendData = async () => {
        try{

            await getName()

            if(inputMessage === ''){
                throw new Error('Write something')
            }
            const id = uid()
            await setDoc(doc(fireDB, 'users', `${id}`), {
                message: inputMessage,
                id: id,
                userId: data.userId,
                timestamp: Date.now(),
                userName: userName,
                userAvatar: userAvatar
            })
    
            setInputMessage('')

            getData()
        }catch(err){
            console.log(err)
        }
    }


    const getData = async () => {
        try{
            setLoading(true)

            await getName()

            setMessages([])
            const extra = []

            const querySnapshot = await getDocs(collection(fireDB, 'users'));
                querySnapshot.forEach(doc => {
                    extra.push(doc.data())
                    return setMessages(oldArray => [...oldArray, doc.data()]) 
            })

            extra.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
            setMessages(extra)

            setLoading(false)
            return extra
        }catch(err){
            console.log(err)
        }
    }


    const updateData = async () => {
        try{
            setLoading(true)
            const extra = await getData()
            const resData = await getName()// eslint-disable-next-line
            extra.map( async (elem) => {
                if(elem.userId === resData._id){
                    if(elem.userAvatar !== resData.avatar){
                        await setDoc(doc(fireDB, 'users', `${elem.id}`), {
                            message: elem.message,
                            id: elem.id,
                            userId: elem.userId,
                            timestamp: elem.timestamp,
                            userName: elem.userName,
                            userAvatar: resData.avatar
                        })
                    }
                }
            })
            await getData()
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }

    const loadingFunction = async () => {
        try{
            setLoading(true)
            await getData()
            await updateData()
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }




    React.useEffect(() => {
        
        loadingFunction()
        // eslint-disable-next-line
    }, [])
    


    if(loading){
        return(
            <div>
                <div className='chats-table-main-div-parent'>
                    <b className='chats-table-main-b'>Global chat</b>
                </div>
                <div style={{display: 'flex', width: '100%', height: '60vh', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '80%', height: '80%', border: '1px solid black', overflowY: 'auto', background: 'white'}}>
                        <Loader />
                    </div>
                </div>
                <input value={inputMessage} type='text' onChange={changeValue} style={{width: '70%', marginLeft: '200px'}} />


                <button onClick={sendData} className='global-chat-button-send'><b>Send</b></button>          
            </div>
        )
    }

    return (
        <div>
            <div className='chats-table-main-div-parent'>
                <b className='chats-table-main-b'>Global chat</b>
            </div>
            <div className='main-div-global-chat center'>
                <div className='div-global-chat'>
                    {
                        messages.map(message => (
                            <div style={{marginLeft: message.userName === userName ? 'auto' : '10px'}} 
                            className='message-main-div'
                            key={message.id}>
                                {
                                    message.userName === userName
                                        ?   <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div className='message-div-message-child' style={{border: message.userName === userName ? '2px solid green' : '2px dashed red',}}>
                                                        <div style={{display: 'flex', justifyContent: message.userName === userName ? 'flex-end' : 'flex-start'}}>
                                                            <b>{message.userName}</b>
                                                        </div>
                                                        <div>{message.message}</div>
                                                    </div>
                                                <img alt='' src={`http://localhost:5000/${message.userAvatar}`} className='message-image'/>
                                            </div>
                                        :   <div style={{display: 'flex', alignItems: 'center'}}>
                                                <img alt='' src={`http://localhost:5000/${message.userAvatar}`} className='message-image'/>
                                                <div className='message-div-message-child' style={{border: message.userName === userName ? '2px solid green' : '2px dashed red',}}>
                                                    <div style={{display: 'flex', justifyContent: message.userName === userName ? 'flex-end' : 'flex-start'}}>
                                                        <b>{message.userName}</b>
                                                    </div>
                                                    <div>{message.message}</div>
                                                </div>
                                            </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <input value={inputMessage} type='text' onChange={changeValue} style={{width: '70%', marginLeft: '200px'}} />


            <button onClick={sendData} className='global-chat-button-send'><b>Send</b></button>          
        </div>
    )
} 


