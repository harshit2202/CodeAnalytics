import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, TextField, RaisedButton } from 'material-ui';
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Login extends Component {
  
    setRedirect(val){
        this.setState({
          redirect: true,
          name : val
         })
      }
      
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={
            {
              pathname : '/dashboard',
              state : {
                  username : this.state.username , 
                  name : this.state.name,
                  firsttime : false
              }
            }
          } />
        }
      }

    handleClick(event){
        
        var that = this;
        axios.post('http://127.0.0.1:3000/auth/login', {
        username : this.state.username,
        password : this.state.password
        })
        .then(function (response) {
        var token = response.data.token;
        console.log(token);
        console.log(response.data);
        cookies.set('token',token,{ path: '/' });
        // let val=response.data.username  
        that.setRedirect();
        })
        .catch(function (error) {
        console.log(error);
        if(error.response.status === 409) {
            alert("Username or Email already exists");
        }
            
        alert(error.response.data);
        console.log(error.response.status);
        });        
    }
    constructor(props) {
      super(props)
    
      this.state = {
         username : '',
         password : '',
         name : '',
         firsttime : false,
         redirect : false
      }
    }
    
    render() {
        return (
            <div>
                  {this.renderRedirect()}
                <MuiThemeProvider>
                    <div>
                        <AppBar title = "Login" />
                        <TextField 
                            hintText="Enter your username"
                            floatingLabelText="Username"
                            onChange = {(event,newvalue) => this.setState({
                                username : newvalue
                            })} />
                        <br />
                        <TextField 
                            type="password"
                            hintText="Enter your password"
                            floatingLabelText="Password"
                            onChange = {(event,newvalue) => this.setState({
                                password : newvalue
                            })} />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style}
                            onClick={(event)=>this.handleClick(event)}/>
       
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
const style = {
    margin: 15,
};
export default Login
