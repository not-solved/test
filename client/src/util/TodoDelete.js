import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import './Todo.css';

class TodoDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }
    handleClose() {
        this.setState({
            open: false
        })
    }

    deleteTodo(id) {
        const URL = '/api/todos/' + id;
        fetch(URL, {
            method: 'DELETE'
        });
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    this.deleteTodo(this.props.id);
                }} >삭제</div>
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogTitle onClose={this.handleClose}>삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 일정이 삭제됩니다.
                        </Typography>
                    </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={(e) => {this.deleteTodo(this.props.id)}}>삭제</Button>
                            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TodoDelete;