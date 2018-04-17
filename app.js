/*
 * @Description:  风控系统node应用启动文件
 * @Author: zehao.sun 
 * @Date: 2017-06-26 20:07:00 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:09:37
 * @Email: 
 */
import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux';
import counterApp from './reducers';
import App from './containers/App';

const app = express();
const port = 4555;


// 每当收到请求时都会触发
app.use(handleRender);

function handleRender(req, res) {
    // 创建新的 Redux store 实例
    const store = createStore(counterApp);
  
    // 把组件渲染成字符串
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )
  
    // 从 store 中获得初始 state
    const preloadedState = store.getState();
  
    // 把渲染后的页面内容发送给客户端
    res.send(renderFullPage(html, preloadedState));
  }
  
  function renderFullPage(html, preloadedState) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Redux Universal Example</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
          </script>
          <script type="text/javascript" src="http://localhost:8088/dll/vendor.dll.js"></script>
          <script type="text/javascript" src="http://localhost:8088/js/page/async-redux/async-redux.entry.js"></script>
        </body>
      </html>
      `
  }

//启动监听服务
app.listen(port, function() {
    var mark = "----------监听:" + port + "端口服务已经启动";
    console.log(mark);
});