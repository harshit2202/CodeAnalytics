import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, TextField, RaisedButton } from 'material-ui';

class Login extends Component {
  
    handleClick(event){
        
        alert("Login Successful UserName = " + this.state.username + " and Password = " + this.state.password)
    }
    constructor(props) {
      super(props)
    
      this.state = {
         username : '',
         password : ''
      }
    }
    
    render() {
        return (
            <div>
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
