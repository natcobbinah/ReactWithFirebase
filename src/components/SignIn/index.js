import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import {SignUpLink} from '../SignUp'
import {withFirebase} from '../Firebase'
import * as ROUTES from '../constants/routes'
import {PasswordForgetLink} from '../PasswordForget'

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

const SignIn = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm/>
        <PasswordForgetLink/>
        <SignUpLink/>
    </div>
)

class SignInFormBase extends Component{
    constructor(props){
        super(props);

        this.state = {
            ...INITIAL_STATE
        }
    }

    onSubmit = event => {
        const{email,password} = this.state;
        this.props.firebase 
            .doSignInWithEmailAndPassword(email,password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({error})
            })
            event.preventDefault();
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render(){
        const{email,password,error} = this.state;
        
        const isInvalid = 
            password === '' ||
            email === '';
        
        return(
            <form onSubmit={this.onSubmit}>
                <input name="email" value={email} onChange={this.onChange}
                    type="email" placeholder="email address"/>
                <br/>
                <input name="password" value={password} onChange={this.onChange}
                    type="password" placeholder="password"/>
                <br/>
                <button disabled={isInvalid} type="submit">
                    SignIn
                </button>
                {error &&
                    <p>{error.message}</p>
                }
            </form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase)

export default SignIn

export {SignInForm}