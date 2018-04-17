import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd/lib/grid';
import style from './App.css';
// import { Menu, Dropdown, Button, Icon, Pagination, message } from 'antd'


// const SubMenu = Menu.SubMenu

const rootNode = document.getElementById('root')

// function handleButtonClick(e) {
//     message.info('Click on left button.')
//     console.log('click left button', e)
// }

// function handleMenuClick(e) {
//     message.info('Click on menu item.')
//     console.log('click', e)
// }

// const menu = (
// <Menu onClick={ handleMenuClick }>
//   <Menu.Item key='1'>
//     <a target='_blank' rel='noopener noreferrer' href='http://www.alipay.com/'>1st menu item</a>
//   </Menu.Item>
//   <Menu.Item key='2'>
//     <a target='_blank' rel='noopener noreferrer' href='http://www.taobao.com/'>2nd menu item</a>
//   </Menu.Item>
//   <SubMenu title='sub menu'>
//     <Menu.Item>
//       3rd menu item
//     </Menu.Item>
//     <Menu.Item>
//       4th menu item
//     </Menu.Item>
//   </SubMenu>
//   <SubMenu title='disabled sub menu' disabled>
//     <Menu.Item>
//       5d menu item
//     </Menu.Item>
//     <Menu.Item>
//       6th menu item
//     </Menu.Item>
//   </SubMenu>
//   <Menu.Divider />
//   <Menu.Item key='3' disabled>
//     <Icon type='search' />3rd menu item
//   </Menu.Item>
// </Menu>
// )

// class App extends React.Component {
//     state = {
//         current: 3,
//     }
//     onChange = (page) => {
//         this.setState({
//             current: page,
//         });
//     }
//     onShowSizeChange= (current, pageSize) => {
//         console.log(current, pageSize);
//     }
//     render() {
//         return (
//             <div>
//               <Row>
//                 <Col span={ 6 }>
//                 <Dropdown overlay={ menu } placement='topLeft'>
//                   <Button>
//                     topLeft
//                   </Button>
//                 </Dropdown>
//                 </Col>
//                 <Col span={ 6 }>
//                 <Dropdown overlay={ menu } trigger={ ['contextMenu'] }>
//                   <span style={ { userSelect: 'none' } }>Right Click on Me</span>
//                 </Dropdown>
//                 </Col>
//                 <Col span={ 6 }>
//                 <Dropdown overlay={ menu } trigger={ ['click'] }>
//                   <a className='ant-dropdown-link' href='#'>Click me <Icon type='down' /></a>
//                 </Dropdown>
//                 </Col>
//                 <Col span={ 6 }>
//                 <Dropdown.Button onClick={ handleButtonClick } overlay={ menu }>
//                   Dropdown
//                 </Dropdown.Button>
//                 <Dropdown.Button onClick={ handleButtonClick } overlay={ menu } disabled style={ { marginLeft: 8 } }>
//                   Dropdown
//                 </Dropdown.Button>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col span={ 6 }>
//                 <Pagination defaultCurrent={ 1 } total={ 50 } />
//                 <Pagination defaultCurrent={ 6 } total={ 500 } />
//                 </Col>
//                 <Col span={ 6 }>
//                 { /*showQuickJumper 输入数字后需要回车*/ }
//                 <Pagination 
//                     size="small" 
//                     showSizeChanger 
//                     showQuickJumper 
//                     onShowSizeChange={ this.onShowSizeChange } 
//                     current={this.state.current}
//                     onChange={ this.onChange } 
//                     defaultCurrent={ 1 }
//                     defaultPageSize={ 100 }
//                     showTotal={ total => `共${total}条数据` } 
//                     pageSizeOptions={['10', '25', '50','100']}
//                     total={ 500 } 
//                 />
//                 </Col>
//                 <Col span={ 6 }>
//                 </Col>
//                 <Col span={ 6 }>
//                 </Col>
//               </Row>
//             </div>
//         )
//     }
// }





// import { Button, Steps,Icon,message } from 'antd';
// const Step = Steps.Step;

// const steps = [{
//     current:0,
//     title: 'Waiting',
//     content: 'First-content',
//     status:'wait',
//     description: 'Waiting',
//   }, {
//     current:1,
//     title: 'Progress',
//     content: 'Second-content',
//     status:'process',
//     description: 'Progress'
//   }, {
//     current:2,
//     title: 'Error',
//     content: 'Third-content',
//     status:'error',
//     description: 'Error'
//   }, {
//     current:3,
//     title: 'Finished',
//     content: 'Last-content',
//     status:'finish',
//     description: 'Finished'
// }];

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           current: 0,
//         };
//     }

//     next() {
//         const current = this.state.current + 1;
//         const currentItem = steps.find(item => item.current === current);
//         const status = currentItem ? currentItem.status : 'error';

//         this.setState({ 
//             current,
//             status
//          });
//     }
    
//     prev() {
//         const current = this.state.current - 1;
//         const currentItem = steps.find(item => item.current === current);
//         const status = currentItem ? currentItem.status : 'error';
//         this.setState({ 
//             current,
//             status
//          });
//     }

//     render() {
//         const { current,status } = this.state;
//         return (
//             <div>
//               <Row>
//                 <Col span={ 12 } >
//                     <Steps size="small" current={current} status={status}>
//                         {steps.map(item => <Step key={item.current} title={item.title} description={item.description} />)}
//                     </Steps>
//                     <div className={style['steps-content']}>{steps[current].content}</div>
//                     <div className={style['steps-action']}>
//                         {
//                         this.state.current < steps.length - 1
//                         &&
//                         <Button type="primary" onClick={() => this.next()}>Next</Button>
//                         }
//                         {
//                         this.state.current === steps.length - 1
//                         &&
//                         <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
//                         }
//                         {
//                         this.state.current > 0
//                         &&
//                         <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
//                             Previous
//                         </Button>
//                         }
//                     </div>
//                 </Col>
//               </Row>
//             </div>
//         )
//     }
// }

// ReactDOM.render(<App />, rootNode)


