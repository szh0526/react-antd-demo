import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/App'

render(
  <Root />,
  document.getElementById('root')
)