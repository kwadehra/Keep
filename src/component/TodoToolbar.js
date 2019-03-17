import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import logo from './keepIco.jpg';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './TodoToolbar.css';
import verifyLogin from './LoginUtils';

export default class TodoToolbar extends Component {
  constructor() {
    super()
    this.state = {
      open : false,
      username:"",
      password:"",
      isUsernameError:false,
      isPasswordError:false,
      usernameHelperText: "",
      passwordHelperText:"",
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.usernameChanged = this.usernameChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
  }
  openModal() {
    this.setState({
      open:true
    });
  }
  closeModal(e) {
    e.preventDefault();
    this.setState({
      open: false,
      username: this.state.username,
      password: this.state.password,
      isLoggedIn: false
    });
  }
  async handleLogin(e) {
    // 0 - is correct login
    // 1 - is incorrect username
    // 2 - is incorrect password
    // 3 - Empty Username
    // 4 - Empty Password
    // 5 - Both Username and Password are empty
    const isVerified = await verifyLogin(document.getElementById('loginemail').value,document.getElementById('loginpassword').value);
    console.log("Inside TodoToolbar ",isVerified);
    if(isVerified.loginCode == 0) {
      this.setState({
        isLoggedIn:isVerified,
        open:false
      });
      console.log("Response sent from TodoToolbar to TodoApp",isVerified.wholeResponse)
      const ifAdded = this.props.loginstatus(isVerified,isVerified.wholeResponse);
      if(ifAdded == true) {
        
      }
    }
    else if(isVerified.loginCode == 1) {
      this.setState({
        isLoggedIn:isVerified,
        isUsernameError:true,
        isPasswordError:false,
        usernameHelperText: "Incorrect E-Mail.Please Try Again",
        passwordHelperText: ""
      });
    }
    else if(isVerified.loginCode == 2) {
      this.setState({
        isLoggedIn:isVerified,
        isUsernameError: false,
        isPasswordError:true,
        usernameHelperText: "",
        passwordHelperText: "Incorrect Password. Please Try Again"
      });
    }
    else if(isVerified.loginCode == 3) {
      this.setState({
        isLoggedIn:isVerified,
        isUsernameError:true,
        isPasswordError:false,
        usernameHelperText: "E-mail must not be left empty",
        passwordHelperText: ""
      })
    }
    else if(isVerified.loginCode == 4) {
      this.setState({
        isLoggedIn:isVerified,
        isUsernameError:false,
        isPasswordError:true,
        usernameHelperText:"",
        passwordHelperText: "Password must not be left empty"
      });
    }
    else if(isVerified.loginCode == 5) {
      this.setState({
        isLoggedIn: isVerified,
        isUsernameError: true,
        isPasswordError: true,
        usernameHelperText: "E-mail must not be left empty",
        passwordHelperText: "Password must not be left empty"
      })
    }
    console.log("Logging in with e-mail",this.state.isLoggedIn);
  }
  usernameChanged(e) {
    this.setState({
      username: e.target.value,
      isUsernameError:false,
      usernameHelperText:""
    })
  }
  passwordChanged(e) {
    this.setState({
    password: e.target.value,
    isPasswordError:false,
    passwordHelperText:""
  })
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
      <Button variant="outlined" color="primary" id="login" onClick = {this.openModal}>Login</Button>
      </Grid>
        </Toolbar>
      </AppBar>
      <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="loginemail"
          label="Email Address"
          type="email"
          fullWidth
          onChange = {this.usernameChanged}
          error = {this.state.isUsernameError}
          helperText = {this.state.usernameHelperText}
        />
        <TextField
        autoFocus
        margin="dense"
        id="loginpassword"
        label="Password"
        type="password"
        fullWidth
        onChange = {this.passwordChanged}
        error = {this.state.isPasswordError}
        helperText = {this.state.passwordHelperText}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
      </div>
  );
}
}

