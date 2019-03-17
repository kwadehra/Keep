import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import logo from './keepIco.jpg';

export default class TodoToolbarLoggedIn extends Component {
  constructor() {
    super()
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(e) {
    this.props.loginstatus(false)
  }
    render() {
        return(<div>
      <AppBar position="static" color="default" className = "appBar">
        <Toolbar>
        <Grid item xs={3}>
          <img id="logoimage" src={logo} />
      <Typography variant= "h6" color="inherit" id = "keepTitle">
      Keep
      </Typography>
      </Grid>
      <Grid item xs = {9}>
      <Button variant="outlined" color="primary" id="login" onClick = {this.handleLogout}>Logout</Button>
      </Grid>
        </Toolbar>
      </AppBar>
      </div>);
    }
}
