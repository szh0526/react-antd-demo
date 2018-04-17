import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Upload, message, Button, Icon } from 'antd';

const mountNode = document.getElementById('root');
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  
ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <Upload {...props}>
                    <Button>
                    <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);