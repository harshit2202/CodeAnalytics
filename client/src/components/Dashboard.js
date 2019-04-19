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
class Dashboard extends Component {
  

  constructor(props) {
    super(props)
  
    this.state = {
       username : this.props.location.state.username ,
       email : this.props.location.state.email ,
       name : this.props.location.state.name , 
       codechefhandle : this.props.location.state.codechefhandle , 
      codeforceshandle : this.props.location.state.codeforceshandle ,
      hackerearthhandle : this.props.location.state.hackerearthhandle
    }
  }
  
  
  render() {
      const loc = this.props.location;
      console.log(this.state.codechefhandle);
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
                      <h2>{this.state.name}</h2>
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
               </tr>
             </tbody>
           </table>
           </div> 
            <SimpleTabs />
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
