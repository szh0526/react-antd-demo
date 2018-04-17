//polyfills垫片库 解决兼容性问题 如：fetch promise 不兼容低版本浏览器的问题
//./ployfill.js用以在浏览器中支持promise/fetch/object-assign。

'use strict';

//如果没有Promise
if (typeof Promise === 'undefined') {
    // Rejection tracking prevents a common issue where React gets into an
    // inconsistent state due to an error, but it gets swallowed by a Promise,
    // and the user has no idea what causes React's erratic future behavior.
    require('promise/lib/rejection-tracking').enable();
    //将Promise设置为全局变量  导入es6扩展类
    window.Promise = require('promise/lib/es6-extensions.js');
}

// window.fetch polyfill fetch垫片库
// require('whatwg-fetch');

// Object.assign() 是React常见的方法  es6本身自带.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');