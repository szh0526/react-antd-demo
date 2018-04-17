import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col } from 'antd';

const mountNode = document.getElementById('root');

import { Tooltip, Button } from 'antd';

const text = <span>prompt text</span>;

const buttonWidth = 70;

ReactDOM.render(
  <div className="demo">
    <div style={{ marginLeft: buttonWidth,marginTop:buttonWidth, whiteSpace: 'nowrap' }}>
        <Tooltip placement="top" title={text}>
            <Button>Top</Button>
        </Tooltip>
    </div>
    <div style={{ width: buttonWidth, marginLeft: (buttonWidth * 4) + 24 }}>
        <Tooltip placement="left" title={text}>
        <Button>Left</Button>
        </Tooltip>
    </div>
    <div style={{ width: buttonWidth, marginLeft: (buttonWidth * 4) + 24 }}>
        <Tooltip placement="right" title={text}>
        <Button>Right</Button>
        </Tooltip>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <Tooltip placement="bottom" title={text}>
        <Button>Bottom</Button>
        </Tooltip>
    </div>
  </div>
, mountNode);