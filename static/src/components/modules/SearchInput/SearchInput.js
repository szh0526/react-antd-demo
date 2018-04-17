import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSearchInputChange = (e) => {
        this.props.onSearchInputChange(e.target.value);
    }

    handleSearchInputClick = (e) => {
        this.props.onSearchInputClick(e);
    }

    render() {
        return (
            <div className={ 'SearchInput' }>
              <input type="text" disabled={ this.props.disabled } value={ this.props.name } onChange={ this.handleSearchInputChange } />
              <button onClick={ this.handleSearchInputClick }>查询</button>
            </div>
        )
    }
}

SearchInput.defaultProps = {
    disabled: true,
    value: '',
}

SearchInput.prototypes = {
    onSearchInputChange: PropTypes.func.isRequired,
    onSearchInputClick: PropTypes.func.isRequired
}

export default SearchInput;