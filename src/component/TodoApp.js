import React, { Component } from 'react';
import TodoToolbar from './TodoToolbar';
import Grid from '@material-ui/core/Grid';
import TodoHomepage from './TodoHomepage';
import TodoToolbarLoggedIn from './TodoToolbarLoggedIn'
import TodoTaker from './TodoTaker';
import { Typography } from '@material-ui/core';
import doOperation from './AddEditDeleteUtils';
import doRegOperation from './RegisterUserUtils';
import TodoList from './TodoList';

class TodoApp extends Component {
    constructor() {
        super() ;
        this.state = {
            isLoggedIn: 100000,
            username:"",
            name:"",
            notes:[],
            wholeResponse: {}
        }
        this.handlePushTaskArrayFromParent = this.handlePushTaskArrayFromParent.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.editDbList = this.editDbList.bind(this);
    }

    async deleteFromList(deleteId) {
        let deleteList = this.state.wholeResponse;
        deleteList.notes = deleteList.notes.filter(task => task.id != deleteId)
        const deleteResponse = await doOperation(this.state.username,deleteList);
        if(deleteResponse.status !=200) {
            return false;
        }
        this.setState((currState) => ({
            notes:deleteResponse.body.notes
        }));
        return true
    }
    handleLoginSuccess(isLoggedInAndVerified,isLoggedInAndVerifiedWholeResponse) {
        this.setState({
            isLoggedIn:isLoggedInAndVerified.loginCode,
            username: isLoggedInAndVerified.username,
            name:isLoggedInAndVerified.name,
            notes:isLoggedInAndVerified.notes,
            wholeResponse: isLoggedInAndVerifiedWholeResponse
        });
    }

    async editDbList(editId,changedTitle,changedText) {
        let editList = this.state.wholeResponse;
        for(var i = 0 ;i <editList.notes.length;i++) {
            if(editList.notes[i].id == editId) {
                editList.notes[i].noteTitle = changedTitle;
                editList.notes[i].noteDescription = changedText;
                break;
            }
        }
        const editResp = await doOperation(this.state.username,editList);
        this.setState({
            notes:editResp.body.notes
        });
        return true
    }

    async handlePushTaskArrayFromParent(title,text) {
        const newNote = {
            id: Math.random() * 3402892,
            noteTitle: title,
            noteDescription:text
    }
    let tempList = this.state.wholeResponse
    tempList.notes.push(newNote);
    // console.log("Response After Addition in TodoApp",tempList);
    
    // call API for success
    const addResponse = await doOperation(this.state.username,tempList);
    // add to notes array for display
    this.setState((curState) => ({
        notes: addResponse.body.notes
    }));

    return true;
}
    async addUserHome(newUser) {
        let addNewUserResponse = await doRegOperation(newUser);
        return true;
    }
    render() {
        if(this.state.isLoggedIn == 0) {
            return(<div>
                <Grid container spacing ={24}>
                <Grid item xs = {12}>
                <TodoToolbarLoggedIn loginstatus = {this.handleLoginSuccess}/>
                </Grid>
                <Grid item xs = {12}>
                <TodoTaker addNotes = {this.handlePushTaskArrayFromParent}/>
                </Grid>
                <Grid item xs = {12}>
                <Typography variant="h5" color="inherit">{this.state.name +"'s "+"Tasks"}</Typography>
                <Grid item xs = {12}>
                <TodoList noteList = {this.state.notes} 
                          removeFromDbList = {this.deleteFromList}
                          editDb = {this.editDbList}/>
                </Grid>
                </Grid>
                </Grid>
                </div>)
        }
    else {
    return(<div>
        <Grid container spacing ={24}>
        <Grid item xs = {12}>
        <TodoToolbar loginstatus = {this.handleLoginSuccess}/>
        </Grid>
        </Grid>
        <TodoHomepage addUser = {this.addUserHome}/>
        </div>);
    }
    }
}
export default TodoApp
