import React from 'react';
import TodoDelete from './TodoDelete';
import TodoUpdate from './TodoUpdate';
import './Todo.css';

class Todo extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos
        }
        this.updateTodo = this.updateTodo.bind(this)
    }

    updateTodo = ( todo ) => {
        console.log(todo);
        const URL = '/api/todos/' + todo.deadline + '/' + todo.checked + '/' + todo.id ;
        fetch(URL, {
            method: 'UPDATE'
        });
    }

    render() {
        const todos = this.props;
        const dateFunc = () => {
            let pickDate = '';
            if(todos.deadline !== '') {
                const date = new Date(Date.parse(todos.deadline));
                pickDate = date.getFullYear() + '. ' + (date.getMonth() + 1) + '. ' + date.getDate();
            }
            return pickDate;
        }

        return (
            <div className="todo-item" onClick={() => {
                            this.props.handleToggle(todos.id)
                            this.updateTodo(todos)}}>
                <div className={`todo-text ${todos.checked && 'checked'}`} >
                    <div><h3>{ todos.title }</h3></div>
                    {
                        (todos.deadline !== undefined) && <div className="deadline">{ dateFunc() }</div>
                    }
                    <div>{ todos.memo }</div>
                </div>
                {
                    todos.checked ? <div className="check-mark">✓</div> : null
                }
                <TodoUpdate StateRefresh={this.props.StateRefresh} todos={todos}/>
                <TodoDelete StateRefresh={this.props.StateRefresh} id={todos.id}/>
            </div>
        );
    }
}

export default Todo