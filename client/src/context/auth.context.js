import React from 'react'

const nothing = () => {}

export const AuthContext = React.createContext({
    accesToken: null,
    refreshToken: null,
    login: nothing,
    logout: nothing,
    check: nothing,
    isActivated: false,
    userName: null,
    isAuthenticated: false
})