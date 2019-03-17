import React,{ Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Todo from './Todo';
import './TodoList.css';

class TodoList extends Component {
    constructor() {
        super();
    }
    render() {
        return (<Grid container spacing = {24} className = "board" id="todoList">
        {this.props.noteList.map((todo) => 
        <Todo title = {todo.noteTitle} 
              key = {todo.id} 
              keyProp = {todo.id} 
              desc = {todo.noteDescription}
              removeFromTaskDb = {this.props.removeFromDbList}
              editNote = {this.props.editDb}
              />)}
        </Grid>)
    }
}
export default TodoList;