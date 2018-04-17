import 'index.css';
import join from 'lodash/join';

function component(){
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';

    element.innerHTML = join(['hello','chunk'],' ');
    element.appendChild(br);
    element.appendChild(button);

    button.onclick = e => {
        return import(/* webpackChunkName: "/js/page/index1/print"*/ './print').then(module => {
            var print = module.default; //获取print函数;
            print();
        });
    };

    return element;

}

function component1(){
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';

    element.innerHTML = join(['hello','chunk','!!'],' ');
    element.appendChild(br);
    element.appendChild(button);

    button.onclick = e => {
        return import(/* webpackChunkName: "/js/page/index1/print1"*/ './print1').then(module => {
            var print = module.default; //获取print函数;
            print();
        });
    };

    //当print模块已经被加载 则访问浏览器缓存文件 否则发起请求
    button.onmouseover = e => {
        return import(/* webpackChunkName: "/js/page/index1/print"*/ './print').then(module => {
            var print = module.default; //获取print函数;
            print();
        });
    };

    return element;

}

document.body
    .appendChild(component())
    .appendChild(component1());


// async function getComponent() {  
//     var element = document.createElement('div');
//     //const _ = await import(/*webpackChunkName:"lodash" */ 'lodash');
//     element.innerHTML = "cccccc"; //joinjoin(['aa','bbb'],'ccc');
//     return element;
// }

// getComponent().then(component=>{
//     document.body.appendChild(component);
// });