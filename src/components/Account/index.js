import React from 'react'
import {PasswordForgetForm} from '../PasswordForget'
import PasswordChange from '../PasswordChange'
import {AuthUserContext,withAuthorization} from '../Session'

const Account = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
            <h1>Account : {authUser.email}</h1>
            <h3>Forgotten Password</h3>
            <PasswordForgetForm/>
    
            <h3>Change Password</h3>
            <PasswordChange/>
        </div>
        )}
    </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account)