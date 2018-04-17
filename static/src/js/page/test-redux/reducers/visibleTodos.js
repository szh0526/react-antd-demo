import {ADD_TODO,TOGGLE_TODO} from '../constants';
let initialState = [
  {
    text: 'Consider using Redux',
    completed: true,
  },
  {
    text: 'Keep all state in a single tree',
    completed: false
  }
]
const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return { ...todo, completed: true }
        }
        return todo
      })
    default:
      return state
  }
}

export default todos
