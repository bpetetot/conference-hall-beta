import React, { Component } from 'react';

import 'font-awesome/css/font-awesome.min.css'
import 'src/styles/themes/default.css'
import 'src/styles/components/button.css'

class Wrapper extends Component {
  render() {
    return (
      <div className="default-theme">
        {this.props.children}
      </div>
    );
  }
}

export default Wrapper;
