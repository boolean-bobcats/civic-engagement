import React, { Component } from 'react';


class Counter extends Component {
  render() {
    return (
      <button
        onClick={() => {
          console.log('clicky clicky');
          return {
            type: "INCREMENT",
          }
          // incCounter;
        }}
      >
      Count: { this.props.count }
      </button>
    );
  }

}


// const store = createStore(counter);
// mapStateToProps(Counter);
export default Counter;
