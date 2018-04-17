import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'antd/lib/grid'
import { Cascader } from 'antd'
import style from './App.css'

const mountNode = document.getElementById('root');
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    disabled: true,
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];


function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
}

function displayRender(label) {
    return label[label.length - 1];
}
  
ReactDOM.render(
    <Cascader 
        size="large" 
        defaultValue={['jiangsu', 'nanjing', 'zhonghuamen']} 
        options={options} 
        onChange={onChange} 
        showSearch 
        expandTrigger="hover"
        placeholder="请选择"
        notFoundContent="暂无数据"
        displayRender={displayRender}
    />
, mountNode);


// const options = [{
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     isLeaf: false,
//   }, {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     isLeaf: false,
//   }];
  
//   class LazyOptions extends Component {
//     state = {
//       options,
//     };
//     onChange = (value, selectedOptions) => {
//       console.log(value, selectedOptions);
//     }
//     loadData = (selectedOptions) => {
//       const targetOption = selectedOptions[selectedOptions.length - 1];
//       targetOption.loading = true;
        

//       //换成fetch 请求数据接口
//       // load options lazily
//       setTimeout(() => {
//         targetOption.loading = false;
//         targetOption.children = [{
//           label: `${targetOption.label} Dynamic 1`,
//           value: 'dynamic1',
//         }, {
//           label: `${targetOption.label} Dynamic 2`,
//           value: 'dynamic2',
//         }];
//         this.setState({
//           options: [...this.state.options],
//         });
//       }, 1000);
//     }
//     render() {
//       return (
//         <Cascader
//           size="large" 
//           options={this.state.options}
//           loadData={this.loadData}
//           onChange={this.onChange}
//           placeholder="请选择"
//           changeOnSelect
//         />
//       );
//     }
//   }
  
//   ReactDOM.render(<LazyOptions />, mountNode);