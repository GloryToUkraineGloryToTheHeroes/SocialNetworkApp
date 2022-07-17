import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import { ChatPage } from './pages/Chat/ChatPage'
import { AvatarChange } from './components/avatar/AvatarChange'
import { EditProfile } from './components/profile/your/EditProfile'
import { ElseProfile } from './components/profile/else/ElseProfile'
import { UsersChat } from './pages/Chat/UsersChat'
import { ChatTable } from './pages/Chat/ChatTable'
import { AddPost } from './components/profile/posts/AddPost'

export const useRouter = (isAuth, isActive) => {

    if(isAuth && isActive){
        return(
            <Routes>
                <Route path='/account' element={<MainPage />} />
                <Route path='/chat/global' element={<ChatPage />} />
                <Route path='/avatar/change' element={<AvatarChange />} />
                <Route path='/account/edit/name' element={<EditProfile elem='name' />} />
                <Route path='/account/edit/pass' element={<EditProfile elem='pass' />} />
                <Route path='/account/else/:id' element={<ElseProfile />} />
                <Route path='/chats/users/:id1/:id2' element={<UsersChat />} />
                <Route path='/chats/table/users' element={<ChatTable />} />
                <Route path='/account/posts/add' element={<AddPost />} />
                <Route path='*' element={<Navigate to='/account' />} />
            </Routes>
        )
    }else if(isAuth && !isActive){
        return(
            <Routes>
                <Route path='/account' element={<h2>Confirm email</h2>} />
                <Route path='*' element={<Navigate to='/account' />} />
            </Routes>
        )
    }else if(!isAuth){
        return(
            <Routes>
                <Route path='/auth' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
            </Routes>
        )
    }
}
