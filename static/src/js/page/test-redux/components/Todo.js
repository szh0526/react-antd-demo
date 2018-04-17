import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Todo extends Component {
  render() {
    const {onClick,completed,text} = this.props;
    return (
      <li
        onClick={onClick}
        style={{
          textDecoration: completed ? 'line-through' : 'none',
          cursor: completed ? 'default' : 'pointer'
        }}>
        {text}
      </li>
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}