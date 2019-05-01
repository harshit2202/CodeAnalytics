import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from './Grid';
import { yellow, red } from '@material-ui/core/colors';
import SimpleTabs from './Tabs.js';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Dashboard extends Component {
  

  constructor(props) {
    super(props)
    
    this.state = {
       submissions : [],
       solved : [] , 
       unsolved : [] , 
       tagspie : [] ,
       verdictspie : [] , 
       username : this.props.location.state.username ,
       email : this.props.location.state.email ,
       name : this.props.location.state.name , 
       codechefhandle : this.props.location.state.codechefhandle , 
      codeforceshandle : this.props.location.state.codeforceshandle ,
      hackerearthhandle : this.props.location.state.hackerearthhandle ,
      firsttime : this.props.location.state.firsttime
    }
  }
  
  componentDidMount()
  {
      var that=this;
      axios.get('http://127.0.0.1:3000/users/dashboard',{
        headers : {
        'Authorization' : cookies.get('token')
        }
      })
      .then(function (response) {
      console.log("hello");
      console.log(response);
      that.setState({
        submissions : response.data.data.user.submissions,
        tagspie : response.data.data.tags_pie,
        unsolved : response.data.data.unsolved ,
        solved : response.data.data.solved,
        verdictspie : response.data.data.verdict_pie
      })
      console.log(that.state);
      })
      .catch(function (error) {
      console.log('error')
      console.log(error);
      });
  }    
  refresh(event){

    var that=this;
      axios.get('http://127.0.0.1:3000/users/fetch',{
          headers : {
          'Authorization' : cookies.get('token')
          }
      })
      .then(function (response) {
      console.log("hello");
      })
      .catch(function (error) {
      console.log('error')
      console.log(error);
      });
      console.log("Component DID mount");

  }
  render() {
      const loc = this.props.location;
      return (
      <div>
          <MuiThemeProvider>
          <div style={{backgroundColor: "primary  " , height : "800px"}}>
          <AppBar
             title={`Welcome ${this.state.username}`}
           >
           </AppBar>
           <br>
           </br>
           <div>
           <table>
             <tbody>
               <tr>
                 <td className="tduser">
                    <div id="userdetails" className="center">
                      <h2>Yashwardhan Gupta</h2>
                    </div>
                 </td>
                 <td className="handles"> 
                    <div>
                      <RaisedButton style={{width : "200px"}} href={`https://www.codechef.com/users/${this.state.codechefhandle}`}>  Codechef Profile  </RaisedButton>
                    </div>
                 </td>
                 <td className="handles"> 
                    <div>
                    <RaisedButton style={{width : "200px"}} href={`https://codeforces.com/profile/${this.state.codeforceshandle}`}>  Codeforces Profile  </RaisedButton>
                    </div>
                 </td>
                 <td className="handles"> 
                    <div>
                    <RaisedButton style={{width : "200px"}} href={`https://www.hackerearth.com/@${this.state.hackerearthhandle}`} >  Hackerearth Profile  </RaisedButton>
                    </div>
                 </td>
                 <td className="handles"> 
                    <div>
                    <RaisedButton style={{width : "200px"}} onClick={(event)=>this.refresh(event)}> Refresh Submissions </RaisedButton>
                    </div>
                 </td>
               </tr>
             </tbody>
           </table>
           </div> 
            <SimpleTabs subdata={this.state} />
           </div>
         </MuiThemeProvider>
      </div>
    )
  }
}
const style = {
  margin: 15,
};
export default Dashboard
