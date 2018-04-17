import React, {Component,Fragment} from 'react';

export default function asyncComponent(importComponent) {

  class AsyncComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const {default: component} = await importComponent();

      this.setState({component: component});
    }

    render() {
      const C = this.state.component;

      return (
        <Fragment>
          {C
            ? <C {...this.props}/>
            : null}
        </Fragment>
      )
    }

  }

  return AsyncComponent;
}