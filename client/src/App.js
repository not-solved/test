import React, { Component } from 'react';
import Todo from './util/Todo';
import TodoAdd from './util/TodoAdd';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: '',
    }
    this.StateRefresh = this.StateRefresh.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  StateRefresh() {
    this.setState({
      todos: '',
    })
    this.callAPI()
      .then(response => this.setState({todos: response}))
      .catch(err => console.log(err));
  }

  handleToggle = async (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];

    const nextTodos = [...todos];
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos
    });
  }

  callAPI = async () => {
    const response = await fetch('/api/todos');
    const body = await response.json();
    return body;
  }

  componentDidMount() {
    this.callAPI()
      .then(response => this.setState({todos: response}))
      .catch(err => console.log(err));
  }

  render() {
    const { todos } = this.state;
    const filteredComponents = (data) => {
      return data.map((c) => {
        return <Todo
                  stateRefresh={this.StateRefresh}
                  callAPI = {this.callAPI}
                  handleToggle = {this.handleToggle}
                  key={c.id}
                  id={c.id}
                  title={c.title}
                  memo={c.memo}
                  deadline={c.deadline}
                  checked={c.checked}
                  todos={data}
                  />
      })
    }
    
    return (
        <main className="todo-list_template">
            <div className="title">
                <strong>Todo List</strong>
            </div>
            <selection className="form-wraper">
                {todos ? filteredComponents(todos) : null }
            </selection>
            <TodoAdd StateRefresh={this.StateRefresh} />
        </main>
      );
  }
}

export default App;
