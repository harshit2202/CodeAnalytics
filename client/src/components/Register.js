import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Redirect ,Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Register extends Component {

  setRedirect(){
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={
        {
          pathname : '/handles',
          state : {
              username : this.state.username , 
              email : this.state.email ,
              name : this.state.first_name + " " + this.state.last_name,
              firsttime : true
          }
        }
      } />
    }
  }

  handleClick()
  {
    console.log("hello");
    var that = this;
    axios.post('http://127.0.0.1:3000/auth/signup', {
      username : this.state.username,
      firstName : this.state.first_name,
      lastName : this.state.last_name,
      email : this.state.email,
      password : this.state.password,
      firsttime : true
    })
    .then(function (response) {
      var token = response.data.data.token;
      console.log(token);
      cookies.set('token',token,{ path: '/' });
      that.setRedirect();
    })
    .catch(function (error) {
      console.log(error);
      if(error.response.status === 409) {
        alert("Username or Email already exists");
        this.setState(
          {
            username : "" ,
            email : ""
          }
        )
      }
        
      alert(error.response.data);
      console.log(error.response.status);
    });

  }
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      username:'',
      firsttime : false,
      redirect : false,
      redirect2 : false
    }
  }
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Username"
             type="text"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
           <Link to='/login'><RaisedButton label="Already a User,Login" primary={true} style={style}/></Link>          
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;