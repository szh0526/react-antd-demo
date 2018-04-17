import React from 'react'

const Message = function (props) {
  if (!props.warn) {
    return null
  }

  const message = {
    0: '失败',
    1: '成功'
  }

  const getMessage = () => {
    return message[props.type]
  }

  return (
    <span className='error'>{getMessage()}</span>
  )
}

const NumberListItem = function (props) {
  return (
    <li>
      {props.value}
    </li>
  )
}

export const NumberList = function (props) {
  const numbers = props.numbers ? props.numbers : []
  const listItems = numbers.map((value, index, array) => {
    return <NumberListItem id={value.id} key={value.id.toString()} value={value.text} />
  })

  return (
    <ul>
      {listItems}
    </ul>
  )
}

export const TestZuhe = function (props) {
  return (
    <div>
      <label>
        测试：
      </label>
      <input
        type='text'
        value={props.value}
        onChange={props.onChange}
        className={props.warn ? 'error' : ''} />
      <Message warn={props.warn} type={props.type} />
      {props.children}
    </div>
  )
}
