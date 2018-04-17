import { combineReducers } from 'redux'
import todos from './visibleTodos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
