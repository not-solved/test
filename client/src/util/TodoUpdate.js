import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Todo.css';

class TodoUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            memo: this.props.memo,
            deadline: this.props.deadline,
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.updateTodo(this.props.todos)
            .then ((response) => {
                console.log(response.data)
                this.props.StateRefresh();
            })
        this.setState({
            id: '',
            title: '',
            memo: '',
            deadline: '',
            open: false
        });
        // window.location.reload();
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    updateTodo(todos) {
        const URL = '/api/todos/' + todos.title + '/' + todos.memo + '/' + todos.deadline + '/' + todos.checked + '/' + todos.id;
        fetch(URL, {
            method: 'UPDATE'
        });
    }

    handleClickOpen() {
        this.setState({
          open: true
        });
    }
    
    handleClose() {
        this.setState({
            title: '',
            memo: '',
            deadline: '',
            open: false
        })
    }

    render() {
        return (
            <div>
                <div className="update" onClick={(e) => {
                    e.stopPropagation();
                    this.handleClickOpen();
                }} >수정</div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle><strong>일정 수정</strong></DialogTitle>
                    <DialogContent>
                        제목 <TextField label="title" type="text" name="title" value={this.state.title} onChange={this.handleValueChange} /><br /><br />
                        설명 <TextField label="memo" type="text" name="memo" value={this.state.memo} onChange={this.handleValueChange} /><br /><br />
                        마감일 <TextField type="date" name="deadline" value={this.state.deadline} onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit} >Insert</Button>
                        <Button variant="contained" color="secondary" onClick={this.handleClose} >Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TodoUpdate
