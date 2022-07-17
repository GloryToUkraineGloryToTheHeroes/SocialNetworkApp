import React from 'react'
import { useHttp } from '../hooks/http.hook'

const storageName = 'userData'

export const useAuth = () => {
    const [accesToken, setAccesToken] = React.useState(null)
    const [refreshToken, setRefreshToken] = React.useState(null)
    const [userId, setUserId] = React.useState(null)// eslint-disable-next-line
    const [isActivated, setIsActivated] = React.useState(false)
    const [userName, setUserName] = React.useState('')
    const [ready, setReady] = React.useState(false)
    const [cLoading, setCLoading] = React.useState(false)

    const login = React.useCallback((aToken, rToken, id,) => {
        setAccesToken(aToken)
        setRefreshToken(rToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            accesToken: aToken, refreshToken: rToken, userId: id
        }))
    }, [])

    const logout = React.useCallback(() => {
        setAccesToken(null)
        setRefreshToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    const {request} = useHttp()

    const check = React.useCallback(async () => {
        setCLoading(true)
        
        const data = JSON.parse(localStorage.getItem(storageName))// eslint-disable-next-line
        if(data){
            const resData = await request('/auth/check', 'GET', null, {id: data.userId})
            setIsActivated(resData.isActivated)
            setUserName(resData.name)
            return setCLoading(false)
        }
        setIsActivated(false) 
        return  setCLoading(false)
    }, [request])

    React.useEffect(() => {
        check()
    }, [check])

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.accesToken){
            login(data.accesToken, data.refreshToken, data.userId)
        }// eslint-disable-next-line

        setReady(true)
    }, [login])


    return {login, logout, check, accesToken, refreshToken, userId, isActivated, userName, ready, cLoading}
}