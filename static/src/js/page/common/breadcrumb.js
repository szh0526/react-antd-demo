import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Icon} from 'antd';

export default (props) => {
   const {links} = props;
   return (
      <Breadcrumb style={{margin: "16px 0"}}>
        {links.map((value,index)=>{
          return <Breadcrumb.Item key={index}>
              {value.path ? (
                <Link to={value.path}>
                    <Icon type={value.type} />
                    <span>{value.title}</span>
                </Link>
              ) : (
                value.title
              )}
            </Breadcrumb.Item>
        })}
      </Breadcrumb>
   )
}
