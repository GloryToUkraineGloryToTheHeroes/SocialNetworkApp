import React from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'

function AuthPage(){
    const auth = React.useContext(AuthContext)
    const [form, setForm] = React.useState({
        name: '',
        password: '',
        email: ''
    })

    const message = useMessage()
    const {request, error, clearError} = useHttp()

    React.useEffect(() => {
        message(error)
        clearError()
    }, [error, clearError, message])

    const changeValues = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const signup = async () => {
        try{
            await request('/auth/signup', 'POST', {...form})
            message('User has been created')
        }catch(err){}
    }

    const login = async () => {
        try{
            const data = await request('/auth/login', 'POST', {...form})
            auth.login(data.accessToken, data.refreshToken, data.data._id)
            auth.check()
        }catch(err){}
    }

    return(
        <div style={{margin: '200px auto', width: '200px'}}>
            <div>
                <label>
                    <label>Name:</label><br />
                    <input 
                        name='name'
                        id="name"
                        type='text'
                        onChange={changeValues}
                        /><br /><br />
                </label>
                <label>
                    <label>Password:</label><br />
                    <input 
                        name='password'
                        id="password"
                        type='password'
                        onChange={changeValues}
                        /><br /><br />
                </label>
                <label>
                    <label>Email:</label><br />
                    <input 
                        name='email' 
                        id="email"
                        type='text'
                        onChange={changeValues}
                        />
                </label>
            </div>
            <div>
                <br />
                <button onClick={signup} className='auth-page-button'><b>Sign up</b></button>
                <button onClick={login} className='auth-page-button'><b>Log in</b></button>
            </div>
            
        </div>
    )
}

export default AuthPage