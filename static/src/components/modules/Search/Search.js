import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    constructor(props) {
        super(props);
        //内部状态
        this.state = {};
    }

    handleChange = (e) => {
        e.preventDefault();
        this.props.onSearchChange(e.target.value);
    }

    render() {
        return (
            <div>
              { this.props.searchType }:
              <input type="text" value={ this.props.value } onChange={ this.handleChange } />
            </div>
        )
    }
}

Search.defaultProps = {
    value: '',
}

Search.propTypes = {
    searchType: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired
}

export default Search;