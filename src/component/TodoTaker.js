import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import Grid  from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    fab: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });

class TodoTaker extends Component {
    constructor() {
        super();
        this.state = {
            open:false,
            title:"",
            noteText:"",
            isNoteTextEmpty:false,
            noteTextEmptyError:""
        }
        this.onAddNote = this.onAddNote.bind(this);
        this.openNoteModal = this.openNoteModal.bind(this);
        this.closeNoteModal = this.closeNoteModal.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.noteTextChanged = this.noteTextChanged.bind(this);
    }
    openNoteModal() {
        this.setState({
            open:true
        });

    }
    closeNoteModal() {
        this.setState({
            open:false
        });

    }
    onAddNote(e) {
        e.preventDefault();
        if(document.getElementById('noteText').value == ""){
            this.setState({
                isNoteTextEmpty:true,
                noteTextEmptyError:"Note Text cannot be left empty"
            });
            return;
        }
        else {
            this.setState({
                title:document.getElementById('noteTitle').value,
                noteText:document.getElementById('noteText').value
            })
            this.props.addNotes(this.state.title,this.state.noteText);
            this.closeNoteModal();
    }
    }
    titleChanged(e) {
        this.setState({
            title: e.target.value
        });
    }
    noteTextChanged(e) {
        this.setState({
            isNoteTextEmpty:false,
            noteTextEmptyError:"",
            noteText:e.target.value
        });
    }
    render() {
        const {classes} = this.props
        return(<div className="addANote">
        <Grid container spacing = {24}>
        <Grid item xs = {12}>
        <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon onClick ={this.openNoteModal}/>
        </Fab>
        </Grid>
        <Grid item xs = {12}>
        <Typography>
        Add a Task
        </Typography>
        </Grid>
        </Grid>
        <Dialog
      open={this.state.open}
      onClose={this.closeNoteModal}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Save A Task Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="noteTitle"
          label="Title"
          type="text"
          fullWidth
          onChange = {this.titleChanged}
        />
        <TextField
        autoFocus
        margin="dense"
        id="noteText"
        label="Note Text"
        type="text"
        mulitline = "true"
        rows = "2"
        rowsMax="4"
        fullWidth
        onChange = {this.noteTextChanged}
        error = {this.state.isNoteTextEmpty}
        helperText = {this.state.noteTextEmptyError}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.closeNoteModal} color="primary">
          Cancel
        </Button>
        <Button onClick={this.onAddNote} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
        </div>);
    }
}

TodoTaker.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(TodoTaker)