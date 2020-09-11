import React, { Component } from 'react';

export default function (WrappedComponent) {
  return class withScrollToTop extends Component {
    componentDidUpdate() {
      window.scrollTo(0, 0);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
};