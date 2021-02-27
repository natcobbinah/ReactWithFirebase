import React from 'react'
import {PasswordForgetForm} from '../PasswordForget'
import PasswordChange from '../PasswordChange'

const Account = () => (
    <div>
        <h1>Account</h1>
        <h3>Forgotten Password</h3>
        <PasswordForgetForm/>

        <h3>Change Password</h3>
        <PasswordChange/>
    </div>
)

export default Account