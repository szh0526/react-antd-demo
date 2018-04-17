import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Card, Button } from 'antd';

const mountNode = document.getElementById('root');

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

class App extends Component {
    state = {
        loading: true
    }

    onClick = () => {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 3000)
    }

    render() {
        const {loading} = this.state;
        return (
            <React.Fragment>
              <Row>
                <Col span={ 24 }>
                <div style={ { background: '#ECECEC', padding: '30px' } }>
                  <Card title="Card title" bordered={ false } style={ { width: 300 } }>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
                </div>
                </Col>
              </Row>
              <Row>
                <Col span={ 24 }>
                    <Card title="Card Title">
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                    </Card>
                </Col>
              </Row>
              <Row>
                <Col span={ 16 }>
                <div style={ { background: '#ECECEC', padding: '30px' } }>
                  <Row gutter={ 16 }>
                    <Col span={ 8 }>
                    <Card loading={ loading } hoverable title="Card title" bordered={ false }>Card content</Card>
                    </Col>
                    <Col span={ 8 }>
                    <Card loading={ loading } hoverable title="Card title" bordered={ false }>Card content</Card>
                    </Col>
                    <Col span={ 8 }>
                    <Card loading={ loading } hoverable title="Card title" bordered={ false }>Card content</Card>
                    </Col>
                  </Row>
                </div>
                </Col>
                <Col span={ 8 }>
                <Button type="primary" size="small" onClick={ this.onClick }>查询</Button>
                </Col>
              </Row>
            </React.Fragment>
            );
    }
}


ReactDOM.render(<App />, mountNode);



// const tabList = [{
//     key: 'tab1',
//     tab: 'tab1',
//   }, {
//     key: 'tab2',
//     tab: 'tab2',
//   }];
  
//   const contentList = {
//     tab1: <p>content1</p>,
//     tab2: <p>content2</p>,
//   };
  
//   const tabListNoTitle = [{
//     key: 'article',
//     tab: 'article',
//   }, {
//     key: 'app',
//     tab: 'app',
//   }, {
//     key: 'project',
//     tab: 'project',
//   }];
  
//   const contentListNoTitle = {
//     article: <p>article content</p>,
//     app: <p>app content</p>,
//     project: <p>project content</p>,
//   };
  
//   class TabsCard extends React.Component {
//     state = {
//       key: 'tab1',
//       noTitleKey: 'article',
//     }
//     onTabChange = (key, type) => {
//       console.log(key, type);
//       this.setState({ [type]: key });
//     }
//     render() {
//       return (
//         <div>
//           <Card
//             style={{ width: '100%' }}
//             title="Card title"
//             tabList={tabList}
//             onTabChange={(key) => { this.onTabChange(key, 'key'); }}>
//             {contentList[this.state.key]}
//           </Card>
//           <br /><br />
//           <Card
//             style={{ width: '100%' }}
//             tabList={tabListNoTitle}
//             onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}>
//             {contentListNoTitle[this.state.noTitleKey]}
//           </Card>
//         </div>
//       );
//     }
//   }
  
//   ReactDOM.render(
//     <TabsCard />
//   , mountNode);