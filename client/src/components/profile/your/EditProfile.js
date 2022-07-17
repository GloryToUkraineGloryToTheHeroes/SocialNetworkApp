import React from 'react'
import { NavLink } from 'react-router-dom'
import { EditName } from './EditName'
import { EditPass } from './EditPass'

export const EditProfile = (props) => {
    return(
        <div>
            <div className='chats-table-main-div-parent'>
                <b className='chats-table-main-b'>Edit profile</b>
            </div>
            
            <div className='edit-profile-main-div center'>
                <div className='edit-profile-div'>
                    <div className='edit-profile-div-1'>
                        <div className='edit-profile-div-2'>
                            <NavLink to='/account/edit/name' ><button className='edit-profile-button'><b>Edit name</b></button></NavLink><br /><br />
                            <NavLink to='/account/edit/pass' ><button className='edit-profile-button'><b>Edit pass</b></button></NavLink>
                        </div>
                        <div>
                            {
                            (props.elem === 'name')
                                ?<EditName />
                                :<EditPass />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}