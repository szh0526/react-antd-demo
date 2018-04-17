import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {VisibilityFilters} from '../constants'

const {SHOW_ALL,SHOW_COMPLETED,SHOW_ACTIVE} = VisibilityFilters;

export default class Footer extends Component {
  renderFilter(filter, name) {
    if (this.props.filter) {
      return name
    }

    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }}>
        {name}
      </a>
    )
  }

  render() {
    return (
      <p>
        Show:
        {' '}
        {this.renderFilter(SHOW_ALL, 'All')}
        {', '}
        {this.renderFilter(SHOW_COMPLETED, 'Completed')}
        {', '}
        {this.renderFilter(SHOW_ACTIVE, 'Active')}
        .
      </p>
    )
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.bool.isRequired
}