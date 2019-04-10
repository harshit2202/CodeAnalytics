import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter, Switch, Route , Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
class Loginscreen extends Component {


    handleClick(event){
        // console.log("event",event);
        console.log("handle click from LoginScreen.js")
        var loginmessage;
        if(this.state.isLogin){
          var loginscreen=[];
          loginscreen.push(<Register parentContext={this}/>);
          loginmessage = "Already registered.Go to Login";
          this.setState({
                         loginscreen:loginscreen,
                         loginmessage:loginmessage,
                         buttonLabel:"Login",
                         isLogin:false
                       })
        }
        else{
          var loginscreen=[];
          loginscreen.push(<Login parentContext={this}/>);
          loginmessage = "Not Registered yet.Go to registration";
          this.setState({
                         loginscreen:loginscreen,
                         loginmessage:loginmessage,
                         buttonLabel:"Register",
                         isLogin:true
                       })
        }
      }
  constructor(props){
    console.log("Constuctor from LoginScreen.js")
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin:true
    }
  }
  componentWillMount(){
    console.log("Component will mounfvfvkbkt from LoginScreen.js")

    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "Not registered yet, Register Now";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage
                    })
  }
  render() {
    console.log("Render from LoginScreen.js")

    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          <MuiThemeProvider>
            <div>
               <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                <Link to="/register"><RaisedButton> Got to Register Page </RaisedButton></Link>
           </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Loginscreen;