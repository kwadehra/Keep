import React, { Component } from 'react';
import theThinker from './theThinker.jpg';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Typography } from '@material-ui/core';
import './TodoHomepage.css';

class TodoHomepage extends Component {
    constructor() {
        super() 
        this.state = {
            open:false,
            name:"",
            email:"",
            password:"",
            isNameError:false,
            nameMessageText:"",
            isEmailError:false,
            emailMessageText:"",
            isPasswordError:false,
            passwordMessageText:""
        }
        this.openNoteModal = this.openNoteModal.bind(this)
        this.closeNoteModal = this.closeNoteModal.bind(this)
        this.nameChanged = this.nameChanged.bind(this)
        this.emailChanged = this.emailChanged.bind(this)
        this.passwordChanged = this.passwordChanged.bind(this)
        this.addUser = this.addUser.bind(this)
    }
    addUser(e) {
        console.log("Add User called")
        let flag = false;
        if(document.getElementById('nameText').value == "") {
            this.setState({
                isNameError:true,
                nameMessageText:"Name should not be left empty",
            })
            flag = true
        }
        if(document.getElementById('emailText').value == "") {
            this.setState({
                isEmailError:true,
                emailMessageText:"Email cannot be left empty",
            })
            flag = true
        }
        if(document.getElementById('passwordText').value == "") {
            this.setState({
                isPasswordError:true,
                passwordMessageText:"Password cannot be left empty",
            })
            flag = true
        }
        if(flag == true) {
            console.log("Returning from add user")
            return
        }
        const newUser = {
            id:document.getElementById('emailText').value,
            name:document.getElementById('nameText').value,
            password:document.getElementById('passwordText').value,
            notes:[]
        }
        console.log("Calling Add user API")
        this.props.addUser(newUser);
        this.closeNoteModal();
    }
    openNoteModal() {
        this.setState({
            open:true
        })

    }
    closeNoteModal() {
        this.setState({
            open:false
        })
    }
    nameChanged(e) {
        this.setState({
            isNameError:false,
            nameMessageText:"",
            name: e.target.value
        })
    }
    emailChanged(e) {
        this.setState({
            isEmailError:false,
            emailMessageText:"",
            email: e.target.value
        })
    }
    passwordChanged(e) {
        this.setState({
            isPasswordError:false,
            passwordMessageText:"",
            password:e.target.value
        })
    }
    render() {
        return(<div>
            <header className="w3-display-container w3-wide" id="home">
            <img className="w3-image" src={theThinker} alt="Home Page" width="1600" height="1700"/>
            <div className="w3-display-left w3-padding-large">
            <h1 className = "w3-text-white" id="keep">Keep</h1>
            <h4 class="w3-jumbo w3-text-white w3-hide-small" id="better"><b>A Better Place to Keep your Tasks.</b></h4>
            <h6><button className="w3-button w3-white w3-padding-large w3-large w3-opacity w3-hover-opacity-off" id="signup" onClick = {this.openNoteModal}>Sign Up</button></h6>
            </div>
            </header>
            <div class="w3-bar #3F51B5 w3-hide-small">
            <a href="#" class="w3-bar-item w3-button"><i class="fa fa-facebook-official"></i></a>
            <a href="#" class="w3-bar-item w3-button"><i class="fa fa-instagram"></i></a>
            <a href="#" class="w3-bar-item w3-button"><i class="fa fa-snapchat"></i></a>
            <a href="#" class="w3-bar-item w3-button"><i class="fa fa-flickr"></i></a>
            <a href="#" class="w3-bar-item w3-button"><i class="fa fa-twitter"></i></a>
            <a href="#" class="w3-bar-item w3-button"><i class="fa fa-linkedin"></i></a>
            </div>
            <Dialog
      open={this.state.open}
      onClose={this.closeNoteModal}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="nameText"
          label="Name"
          type="text"
          fullWidth
          onChange = {this.nameChanged}
          error = {this.state.isNameError}
          helperText = {this.state.nameMessageText}
        />
        <TextField
        autoFocus
        margin="dense"
        id="emailText"
        label="E-mail"
        type="text"
        fullWidth
        onChange = {this.emailChanged}
        error = {this.state.isEmailError}
        helperText = {this.state.emailMessageText}
      />
      <TextField
      autoFocus
      margin="dense"
      id="passwordText"
      label="Password"
      type="text"
      fullWidth
      onChange = {this.passwordChanged}
      error = {this.state.isPasswordError}
      helperText = {this.state.passwordMessageText}
    />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.closeNoteModal} color="primary">
          Cancel
        </Button>
        <Button onClick={this.addUser} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
            </div>
        );
    }
}
export default TodoHomepage