import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import {VisibilityFilters} from '../constants'
import TodoList from '../components/TodoList'

const {SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE} = VisibilityFilters;


const selectTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos
    case SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

const mapStateToProps = state => {
  return {
    todos: selectTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  const boundToggleTodo = (index) => dispatch(toggleTodo(index));
  return {
    onTodoClick: index => {
      boundToggleTodo(index);
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList