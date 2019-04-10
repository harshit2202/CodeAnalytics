import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loginscreen from './components/LoginScreen';
import { BrowserRouter, Switch, Route , Link} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Dash from './components/Dash';
class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Register} />
          <Route path="/login"  component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dash" component={Dash} />
          
          
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
