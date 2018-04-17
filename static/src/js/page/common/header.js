import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Layout, Icon} from 'antd';
import style from './header.css';

const {Header} = Layout;

class LayoutHeader extends Component {
    constructor(props) {
        super(props);
    }

    onToggle = () => {
        this.props.onToggle();
    }

    render() {
        return (
          <Header className={style.headerWrap}>
            <Icon
              className={style.trigger}
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.onToggle}
            />
          </Header>
        )
    }
}

LayoutHeader.propTypes = {
  onToggle: PropTypes.func.isRequired,
}

export default LayoutHeader;