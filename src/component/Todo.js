import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import thinker from './theThinker.jpg';
import EditIcon from './edit_black_18x18.png';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  card: {
    maxWidth: 345,
    marginLeft:20,
    marginBottom:20,
    display: 'flex',
    flexDirection:'column',

  },
  media: {
    objectFit: 'cover',
  },
  portButCl:{
    display: 'flex',
    justifyContent: 'flex-start',
},
portBodyCl: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
},
fab: {
  margin: theme.spacing.unit,
},
extendedIcon: {
  marginRight: theme.spacing.unit,
},
fab: {
  margin: theme.spacing.unit,
},
extendedIcon: {
  marginRight: theme.spacing.unit,
}
});

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      isNoteTextEmpty:false,
      noteTextEmptyError:"",
      currentTitle:this.props.title,
      currentText:this.props.desc
    }
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.openNoteModal = this.openNoteModal.bind(this);
    this.closeNoteModal = this.closeNoteModal.bind(this);
    this.onEditTextChange = this.onEditTextChange.bind(this)
    this.onEditTitleChange = this.onEditTitleChange.bind(this)
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
onEditTextChange(e) {
  this.setState({
    isNoteTextEmpty:false,
    noteTextEmptyError:"",
    currentText: e.target.value
  })
}
onEditTitleChange(e) {
  this.setState({
    currentTitle: e.target.value
  })
}
  handleEdit(e) {
    if(document.getElementById('noteTextEdit').value=="") {
      this.setState({
        isNoteTextEmpty:true,
        noteTextEmptyError:"This field cannot be left empty"
      })
      return;
    }
    this.props.editNote(e.currentTarget.value,document.getElementById('noteTitleEdit').value,document.getElementById('noteTextEdit').value);
    this.closeNoteModal();
  }
  onDeleteClicked(e) {
    this.props.removeFromTaskDb(e.currentTarget.value);
  }
    render() {
      const {classes} = this.props
        return(<div>
          <Card className={classes.card}>
          <CardActionArea className="portBodyCl">
            <CardMedia
              component="img"
              alt="The Thinker"
              className={classes.media}
              height="140"
              image={thinker}
              title="The Thinker"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.title}
              </Typography>
              <Typography component="p" paragraph = {true}>
              {this.props.desc}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.portButCl}>
            <Button size="small" color="primary" 
            onClick ={this.onDeleteClicked}
            value = {this.props.keyProp}>
              <DeleteIcon/>
            </Button>
            <Button size="small" 
                    color="primary" 
                    onClick = {this.openNoteModal}>
            <img src = {EditIcon}/>
            </Button>
          </CardActions>
        </Card>
        <Dialog
      open={this.state.open}
      onClose={this.closeNoteModal}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Your Task Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="noteTitleEdit"
          label="Title"
          type="text"
          fullWidth
          onChange = {this.onEditTitleChange}
          value = {this.state.currentTitle}
        />
        <TextField
        autoFocus
        margin="dense"
        id="noteTextEdit"
        label="Note Text"
        type="text"
        mulitline = "true"
        rows = "2"
        rowsMax="4"
        fullWidth
        error = {this.state.isNoteTextEmpty}
        helperText = {this.state.noteTextEmptyError}
        onChange = {this.onEditTextChange}
        value = {this.state.currentText}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.closeNoteModal} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleEdit} color="primary" value = {this.props.keyProp}>
          Change
        </Button>
      </DialogActions>
    </Dialog>
    </div>
    );

    }
}
Todo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Todo);