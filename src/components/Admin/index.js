import React,{Component} from 'react'
import {withFirebase} from '../Firebase'

class Admin extends Component{
    constructor(props){
        super(props);

        this.state ={
            loading: false,
            users: [],
        }
    }

    componentDidMount(){
        this.setState({loading: true});

        this.props.firebase.users().on('value',snapshot => {
           const usersOjbect = snapshot.val();

           const usersList = Object.keys(usersOjbect).map(key => ({
               ...usersOjbect[key],uid:key,
           }))

            this.setState({
                users: usersList,
                loading: false,
            })
        })
    }
    
    render(){
        const{users,loading} = this.state;
        return(
            <div>
                <h1>Admin</h1>
                <p>
                    The Admin Page is accessible by every signed in admin user.
                </p>
                {loading &&
                    <div>Loading...</div>
                }
                <UserList users={users}/>
            </div>
        )
    }
}

const UserList = ({users}) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID: </strong>{user.uid}
                </span>
                <span>
                    <strong>E-mail: </strong> {user.email}
                </span>
                <span>
                    <strong>Username: </strong>{user.username}
                </span>
            </li>
        ))}
    </ul>
)

export default withFirebase(Admin)