import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Modal, Button } from 'antd';
import style from 'App.css';

const mountNode = document.getElementById('root')
const confirm = Modal.confirm

// class App extends React.Component {
//     state = { visible: false }
//     showModal = () => {
//       this.setState({
//         visible: true,
//       })
//     }
//     handleOk = (e) => {
//       console.log(e)
//       this.setState({
//         visible: false,
//       })
//     }
//     handleCancel = (e) => {
//       console.log(e)
//       this.setState({
//         visible: false,
//       })
//     }
//     render() {
//       return (
//         <React.Fragment>
//             <Row>
//                 <Col span={8}>
//                     <Button type="primary" onClick={this.showModal}>Open</Button>
//                     <Modal
//                     title="Basic Modal"
//                     visible={this.state.visible}
//                     onOk={this.handleOk}
//                     onCancel={this.handleCancel}
//                     >
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                     </Modal>
//                 </Col>
//                 <Col span={8}>
//                 </Col>
//                 <Col span={8}>
//                 </Col>
//             </Row>
//         </React.Fragment>
//       )
//     }
//   }

//   ReactDOM.render(<App />, mountNode)

// class App extends React.Component {
//     state = {
//         ModalText: 'Content of the modal',
//         visible: false,
//         confirmLoading: false,
//     }
//     showModal = () => {
//         this.setState({
//             visible: true,
//         })
//     }
//     handleOk = () => {
//         this.setState({
//             ModalText: 'The modal will be closed after two seconds',
//             confirmLoading: true,
//         })
//         setTimeout(() => {
//             this.setState({
//                 visible: false,
//                 confirmLoading: false,
//             })
//         }, 2000)
//     }
//     handleCancel = () => {
//         console.log('Clicked cancel button')
//         this.setState({
//             visible: false,
//         })
//     }
//     render() {
//         const {visible, confirmLoading, ModalText} = this.state
//         return (
//             <div>
//               <Button type="primary" onClick={ this.showModal }>Open</Button>
//               <Modal title="Title" visible={ visible } onOk={ this.handleOk } confirmLoading={ confirmLoading } onCancel={ this.handleCancel }>
//                 <p>
//                   { ModalText }
//                 </p>
//               </Modal>
//             </div>
//             )
//     }
// }

// ReactDOM.render(<App />, mountNode)

// function showConfirm () {
//   confirm({
//     title: 'Do you want to delete these items?',
//     content: 'When clicked the OK button, this dialog will be closed after 1 second',
//     okText:"确认",
//     cancelText:"取消",
//     onOk() {
//       return new Promise((resolve, reject) => {
//         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
//       }).catch(() => console.log('Oops errors!'))
//     },
//     onCancel() {}
//   })
// }

// function showDeleteConfirm () {
//   confirm({
//     title: 'Are you sure delete this task?',
//     content: 'Some descriptions',
//     okText: 'Yes',
//     okType: 'danger',
//     cancelText: 'No',
//     okText:"确认",
//     cancelText:"取消",
//     onOk() {
//       console.log('OK')
//     },
//     onCancel() {
//       console.log('Cancel')
//     }
//   })
// }

// function info () {
//   Modal.info({
//     title: 'This is a notification message',
//     content: (
//     <div>
//       <p>
//         some messages...some messages...
//       </p>
//       <p>
//         some messages...some messages...
//       </p>
//     </div>
//     ),
//     okText:"确认",
//     onOk() {}
//   })
// }

// function success () {
//   const modal = Modal.success({
//     title: 'This is a notification message',
//     content: 'This modal will be destroyed after 1 second'
//   })
//   setTimeout(() => modal.destroy(), 1000)
// }


// ReactDOM.render(
//   <React.Fragment>
//     <Button onClick={showConfirm}>
//       Confirm
//     </Button>
//     <Button onClick={showDeleteConfirm}>
//       Delete
//     </Button>
//     <Button onClick={info}>
//       Info
//     </Button>
//     <Button onClick={success}>
//       Success
//     </Button>
//   </React.Fragment>
//   , mountNode)


class App extends React.Component {
    state = {
        modal1Visible: false,
        modal2Visible: false,
    }
    setModal1Visible(modal1Visible) {
        this.setState({
            modal1Visible
        });
    }
    setModal2Visible(modal2Visible) {
        this.setState({
            modal2Visible
        });
    }
    render() {
        return (
            <div>
              <Button type="primary" onClick={ () => this.setModal1Visible(true) }>Display a modal dialog at 20px to Top</Button>
              <Modal title="20px to Top" style={ { top: 20 } } visible={ this.state.modal1Visible } onOk={ () => this.setModal1Visible(false) } onCancel={ () => this.setModal1Visible(false) }>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
              </Modal>
              <br />
              <br />
              <Button type="primary" onClick={ () => this.setModal2Visible(true) }>Vertically centered modal dialog</Button>
              <Modal title="Vertically centered modal dialog" wrapClassName="vertical-center-modal" visible={ this.state.modal2Visible } onOk={ () => this.setModal2Visible(false) } onCancel={ () => this.setModal2Visible(false) }>
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
              </Modal>
            </div>
        );
    }
}

ReactDOM.render(<App />, mountNode);