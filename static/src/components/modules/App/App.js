import React from 'react';
import icon from 'iconfont.css';
import style from 'App/App.css';
//import style from 'App/App.scss';

//多个className: https://www.npmjs.com/package/classnames 
//<i className={`${icon.iconfont} ${icon["icon-edit"]}`} ></i>
export default () => {

    const onClick = (e) =>{
        console.log("单击事件!");
    }

    return (
        <div className={style.img1}>
            <a title="编辑" onClick={onClick}>
                <i className={[icon.iconfont,icon["icon-edit"]].join(" ")}
                    style={{ color:"blue",fontSize:"20px",float:"right"}}
                ></i>
            </a>
        </div>
    );
};