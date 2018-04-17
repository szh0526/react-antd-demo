import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Search from 'Search/Search.js'
import SearchInput from 'SearchInput/SearchInput.js'
// import ErrorBoundary from 'Greet/ErrorBoundary.js'
// propTypes 能用来检测props数据类型的变量，包括基本类型的的string，boolean,number,以及引用类型的object,array,function,symbol

class Greet extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      disabled: false,
      name: this.props.name,
      opacity: 1
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.handleSearchInputClick = this.handleSearchInputClick.bind(this)
  }

  componentDidMount () {
    // 等待组件初始化成功 可以调用axios接口 重新初始化状态
    this.setState(prevState => ({
      opacity: (prevState.opacity - 0.5)
    }))
  }

  handleSearchChange (value) {
    this.setState({name: value})
  }

  handleSearchInputChange (value) {
    this.setState({name: value})
  }

  handleSearchInputClick (event) {
    this.setState(prevState => ({
      disabled: !prevState.disabled
    }))
  }

  render () {
    return (
      <div style={{opacity: this.state.opacity}}>
        <Search searchType='姓名' value={this.state.name} onSearchChange={this.handleSearchChange} />
        <SearchInput
          name={this.state.name}
          disabled={this.state.disabled}
          onSearchInputClick={this.handleSearchInputClick}
          onSearchInputChange={this.handleSearchInputChange} />
      </div>
    )
  }
}

Greet.propTypes = {
  name: PropTypes.string.isRequired
}

export default Greet
