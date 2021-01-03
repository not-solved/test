import React from 'react'
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './TodoAdd.css';

class TodoAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            memo: '',
            deadline: '',
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addTodo()
            .then ((response) => {
                console.log(response.data)
                this.props.StateRefresh();
            })
        this.setState({
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

    addTodo() {
        const URL = '/api/todos';
        const formData = new FormData();
        formData.append('title', this.state.title)
        formData.append('memo', this.state.memo)
        formData.append('deadline', this.state.deadline)
        const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
        }
        return post(URL, formData, config);
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
                <Button className="insertBotton" variant="contained" color="primary" onClick={this.handleClickOpen} >일정 추가</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle><strong>일정 추가</strong></DialogTitle>
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

export default TodoAdd
