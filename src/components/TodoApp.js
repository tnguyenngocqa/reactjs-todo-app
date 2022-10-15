import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
// import Footer from "./layout/Footer";
import Footer from "../store/containers/Footer";
import Header from "./layout/Header";
import Todos from "./Todos";
import axios from "axios";

function TodoApp() {
  const [state, setState] = useState({
    todos: []
  })

  const handleCheckboxChange = id => {
    console.log('clicked on checkbox with id = ' + id);
    setState({
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    })
  }

  const addTodo = title => {
    const todoData = {
      title: title,
      completed: false
    }
    axios.post('https://jsonplaceholder.typicode.com/todos', todoData)
      .then(response => {
        console.log(response.data)
        setState({ todos: [...state.todos, response.data] })
      })
  };

  const deleteTodo = id => {
    console.log('clicked on delete with id = ' + id);
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        setState({
          todos: [
            ...state.todos.filter(todo => {
              return todo.id !== id;
            })
          ]
        })
      })
  }

  useEffect(() => {
    const config = {
      params: {
        _limit: 5
      }
    }
    axios.get('https://jsonplaceholder.typicode.com/todos', config)
      .then(response => setState({ todos: response.data }))
  }, [])

  return (
    <div className="container">
      <Header />
      <AddTodo addTodo={addTodo} />
      <Todos
        todos={state.todos}
        handleChange={handleCheckboxChange}
        deleteTodo={deleteTodo}
      />
      <Footer />
    </div>
  );
}

export default TodoApp;
