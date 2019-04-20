import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from './Grid';
import { yellow, red } from '@material-ui/core/colors';
import SimpleTabs2 from './TabsProblempage.js';

export class Problempage extends Component {
  
  constructor(props) {
    super(props)
    console.log(props.match.params.id);
    this.state = {
       
    }
  }
  
  
  render() {
    return (
      <div>
          <MuiThemeProvider>
          <AppBar>
            
          </AppBar>
          <br>
           </br>
           <div>
           <table>
             <tbody>
               <tr>
                 <td className="tduser">
                    <div id="userdetails" className="center">
                      <h2>{this.state.name}Yashwardhan Gupta</h2>
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
           <SimpleTabs2/>

          </MuiThemeProvider>
      </div>
    );
  }
}

export default Problempage
