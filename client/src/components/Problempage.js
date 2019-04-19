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
          </MuiThemeProvider>
      </div>
    );
  }
}

export default Problempage
