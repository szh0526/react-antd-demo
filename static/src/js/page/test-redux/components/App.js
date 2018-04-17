import React,{ Component } from 'react';
import AddTodo from '../containers/AddTodo';
import Todos from '../containers/VisibleTodos';
import Footer from '../containers/VisibilityFilter';

const App = () => (
  <div>
    <AddTodo/>
    <Todos/>
    <Footer/>
  </div>
)

export default App