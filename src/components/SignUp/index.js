import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import PasswordForget from '../PasswordForget';

import {withFirebase} from '../Firebase'

const INITIAL_STATE  = {
    username: '',
    email: '',
    passwordOne:'',
    passwordTwo:'',
    error:null,
}

const SignUp = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm/>
    </div>
)

class SignUpFormBase extends Component{
    constructor(props){
        super(props);
        
        this.state ={
            ...INITIAL_STATE
        }
    
    }

    onSubmit = event => {
        const{username,email,passwordOne} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email,passwordOne)
            .then(authUser => {
                this.setState({...INITIAL_STATE})
            })
            .catch(error => {
                this.setState({error})
            })
            event.preventDefault();
    }

    onChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        const{username,email,passwordOne,
            passwordTwo,error} = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === ''  ||
            email       === ''  ||
            username    === '';
        
        return(
            <form onSubmit={this.onSubmit}>
                <input name="username" value={username} onChange={this.onChange}
                    type="text" placeholder="Fullname"/>
                <br/>
                <input name="email" value={email} onChange={this.onChange}
                    type="email" placeholder="Email Address"/>
                <br/>
                <input name="passwordOne" value={passwordOne} onChange={this.onChange}
                    type="password" placeholder="Password"/>
                <br/>
                <input name="passwordTwo" value={passwordTwo} onChange={this.onChange}
                    type="password" placeholder="Confirm Password"/>
                <br/>
                <button  disabled={isInvalid} type="submit">Sign Up</button>
                {error && 
                    <p>{error.message}</p>
                }
            </form>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}/>
    </p>
)

const SignUpForm = withFirebase(SignUpFormBase)

export default SignUp
export {SignUpForm,SignUpLink};