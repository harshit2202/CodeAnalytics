import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Handles extends Component {
  
  setRedirect(){
    this.setState({
      redirect: true
    })
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      console.log(this.state);
      return <Redirect to={
        {
          pathname : '/dashboard',
          state : {
              codechefhandle : this.state.codechefhandle , 
              codeforceshandle : this.state.codeforceshandle ,
              hackerearthhandle : this.state.hackerearthhandle,
              username : this.state.username ,
              email : this.state.email ,
              name : this.state.name ,
              firsttime : true
          }
        }
      } />
    }
  }
  handleClick()
  {
    this.setRedirect();
    // console.log(cookies.get('token'));
    // var that = this;
    // axios.post('http://127.0.0.1:3000/users/handles', {
    //   codeforcesHandle : this.state.codeforceshandle,
    //   codechefHandle : this.state.codechefhandle,
    //   hackerearthHandle : this.state.hackerearthhandle,
    // } , {
    //   headers : {
    //     'Authorization' : cookies.get('token')
    //   }
    // })
    // .then(function (response) {

    //   console.log(response.data);
    //   that.setRedirect();
      
    // })
    // .catch(function (error) {
    //   if(error.response.code === 409) {
    //     alert("Username or Email already exists");
    //     this.setState(
    //       {
    //         username : "" ,
    //         email : ""
    //       }
    //     )
    //   }
        
    //   alert(error.response.data);
    //   console.log(error.response.status);
    // });

  }
  constructor(props){
    super(props);
    if (this.props.location.state)
    {
      this.state={
      codechefhandle:'',
      codeforceshandle:'',
      hackerearthhandle:'',
      username : this.props.location.state.username ,
      email : this.props.location.state.email ,
      name : this.props.location.state.name , 
      firsttime : true,
      redirect : false
     }
  }
  }
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Enter Your Handles"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="CodeChef Handle"
             onChange = {(event,newValue) => {this.setState({codechefhandle:newValue});console.log(newValue);}}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="CodeForces Handle"
             onChange = {(event,newValue) => this.setState({codeforceshandle:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Username"
             type="text"
             floatingLabelText="Hackerearth Handle"
             onChange = {(event,newValue) => this.setState({hackerearthhandle:newValue})}
             />
           <br/>
           
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Handles;