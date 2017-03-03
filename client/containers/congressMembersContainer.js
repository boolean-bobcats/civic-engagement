import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as actions from '../actions/locationBarActions';
// import GoogleList from '../components/googleListComponent';
import LocationBar from '../components/locationBar';
import RepDisplay from '../components/repDisplay';

// class CongressMembersContainer extends Component {
//   componentWillMount() {
//     console.log('congress members container will mount');
//   }

//   render() {
const CongressMembersContainer = (props) => {
    // const { reps } = this.props;
  return (
    <div>
      {/*<LocationBar />*/}
      <RepDisplay />
      {/*<RepDisplay reps={reps} />*/}
    </div>
  );
};
// }

// function mapStateToProps(state) {
//   return {
//     reps: state.GoogleResults.reps
//   };
// }

// export default connect(mapStateToProps)(CongressMembersContainer);
export default CongressMembersContainer;
