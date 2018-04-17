import React /*,{Component}*/ from 'react';
import ReactDOM from 'react-dom';
//import {TestZuhe,NumberList} from 'Greet/Components.js';
import Greet from 'Greet/Greet.js';
//import GreetJsx from 'Greet/Greet.jsx';

const rootNode = document.getElementById('root');

ReactDOM.render( < Greet name = { '测试' }
        />,rootNode);
        // function formatDate(date){
        //     return "日期："+ date;
        // }

        // function Avatar(props){
        //     return <img className="Avatar"
        //             src={props.user.avatarUrl}
        //             alt={props.user.name}
        //     />
        // }

        // function UserInfo(props){
        //     return <div className="UserInfo">
        //         <Avatar user={props.user}/>
        //         <div className="UserInfo-name">
        //             {props.user.name}
        //         </div>
        //     </div>
        // }



        // function Comment(props) {
        //     return (
        //       <div className="Comment">
        //         <UserInfo user={props.user} />
        //         <div className="Comment-text">
        //           {props.text}
        //         </div>
        //         <div className="Comment-date">
        //           {formatDate(props.date)}
        //         </div>
        //       </div>
        //     );
        //   }

        // const user = {
        //     name:"测试",
        //     avatarUrl:""
        // }
        //ReactDOM.render(<Comment user={user} date={new Date()}/>,rootNode);


        // class Clock extends Component{

        //     constructor(props){
        //         super(props);
        //         this.state = { 
        //             date:new Date(),
        //             counter:0,
        //             posts:[]
        //         };
        //     }

        //     componentDidMount(){
        //         // fetchwPosts().then(response => {
        //         //     this.setState({
        //         //         posts: response.posts
        //         //     });
        //         // });

        //         this.timerId= setInterval(() => {
        //             this.tick();
        //         },1000);
        //     }

        //     componentWillUnmount(){
        //         console.log(1)
        //         clearInterval(this.timerId);
        //     }

        //     tick(){
        //         this.setState((prevState,props)=>({
        //             date:new Date(),
        //             counter:prevState.counter + 1
        //         }));
        //     }

        //     render(){
        //         return (
        //             <div>
        //                 <h1>Hello,world!</h1>
        //                 <h1>第{this.state.counter}次!</h1>
        //                 <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        //             </div>
        //         )
        //     }
        // };

        // class App extends Component{

        //     constructor(props){
        //         super(props);
        //         this.state = {
        //             disabled:props.isLogin ? false : true
        //         }
        //     }

        //     handleClick = (e) => {
        //         e.preventDefault();
        //         this.setState((prevState) => ({
        //             disabled:!prevState.disabled
        //         }));
        //     }

        //     render(){
        //         return (
        //             <div>
        //                 <Clock />
        //                 <button disabled={this.state.disabled} onClick={this.handleClick} >测试</button>
        //             </div>
        //         )
        //     }
        // };

        // ReactDOM.render(
        //     <App isLogin={false}/>,
        //     rootNode
        // );


        // class App1 extends Component{
        //     constructor(props){
        //         super(props);
        //         this.state = {
        //             text:"1",
        //             warn:false,
        //             type:0
        //         }
        //     }

        //     //优化渲染，判断是否值得更新
        //     shouldComponentUpdate(nextProps, nextState) {
        //         if (this.props.name !== nextProps.color) {
        //             return true;
        //         }
        //         return false;
        //     }

        //     handleChange = (e) => {
        //         const value = e.target.value;
        //         this.setState({
        //             text:value,
        //             warn:value === "0" ? true : false
        //         })
        //     }

        //     render(){
        //         let _self = this;
        //         const numbers = [
        //             {id:1,text:"a"},
        //             {id:2,text:"b"},
        //             {id:3,text:"c"},
        //             {id:4,text:"d"},
        //             {id:5,text:"e"}
        //         ];

        //         const props = {
        //             onChange:_self.handleChange,
        //             value:_self.state.text,
        //             warn:_self.state.warn,
        //             type:_self.state.type
        //         }

        //         return (
        //             <TestZuhe {...props}>
        //                 {!props.warn && numbers.length > 0 &&
        //                     <NumberList numbers={numbers} />
        //                 }
        //             </TestZuhe>
        //         )
        //     }
        // }

        // ReactDOM.render(
        //     <App1 />,
        //     rootNode
        // )