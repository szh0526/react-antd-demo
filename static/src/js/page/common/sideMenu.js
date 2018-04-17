import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import PropTypes from 'prop-types';
import style from 'sideMenu.css';

const {Sider} = Layout;
const {SubMenu} = Menu;

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data:[]
        }
    }

    onCollapse = (collapsed) => {
        this.props.onCollapse(collapsed);
    }

    componentDidMount = () =>{
        const datas = [{
        'id': 'd5c230bf-cc2c-485c-956e-db004cac9194',
        'title': '测试-1',
        'url': '',
        'code': null,
        'sort': 4,
        'type': 1,
        'createTime': 0,
        'menus': [{
                'id': '083e0681-49b1-429c-ae85-e6682cb70571',
                'title': '测试-1-1',
                'url': '/approvalRecordCredit/1-1',
                'code': null,
                'sort': 0,
                'type': 1,
                'createTime': 0,
                'menus': null
            },{
                'id': '91f4d54c-189b-4c18-8bca-7b8a0fd2481b',
                'title': '测试-1-2',
                'url': '/outCallAnalysis/1-2',
                'code': null,
                'sort': 2,
                'type': 1,
                'createTime': 0,
                'menus': null
            }]
        },{
            'id': '643d88dd-199d-4c32-a50c-492a8998d061',
            'title': '测试-2',
            'url': '',
            'code': null,
            'sort': 5,
            'type': 1,
            'createTime': 0,
            'menus': [{
                'id': '244d66de-8482-4598-b87a-61f5792d6091',
                'title': '测试-2-1',
                'url': '/approvalRecordCreditSZ/2-1',
                'code': null,
                'sort': 9999,
                'type': 1,
                'createTime': 0,
                'menus': null
            },{
                'id': 'ttttt-8482-4598-b87a-61f5792d6091',
                'title': '404',
                'url': '/404',
                'code': null,
                'sort': 9999,
                'type': 1,
                'createTime': 0,
                'menus': null
            }]
        }];

        this.setState({
            data:datas
        })
    }

    render() {
        const {data} = this.state;
        return (
            <Sider
                collapsible={true}
                collapsed={this.props.collapsed}
                onCollapse={this.onCollapse}>
                <div className={style.logo}/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultOpenKeys={['d5c230bf-cc2c-485c-956e-db004cac9194']}
                    defaultSelectedKeys={['083e0681-49b1-429c-ae85-e6682cb70571']}>
                    {data.map((parent,index) => {
                        return (
                            <SubMenu 
                                key={parent.id}
                                title={
                                    <span>
                                        <Icon type="mail"/>
                                        <span>{parent.title}</span>
                                    </span>
                            }>
                            {parent.menus.map((child, index) => (
                                <Menu.Item key={child.id}>
                                    <Link to={child.url}>
                                        <Icon type="solution" />
                                        <span>{child.title}</span>
                                    </Link>
                                </Menu.Item>
                            ))}
                            </SubMenu>
                        )
                    })}
                </Menu>
            </Sider>
        )
    }
}

SideMenu.defaultProps = {
    collapsed: false
}

SideMenu.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onCollapse: PropTypes.func.isRequired
}

export default SideMenu;