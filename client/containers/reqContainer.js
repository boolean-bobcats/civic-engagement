import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/locationBarActions';
import GoogleList from '../components/googleListComponent';
import LocationBar from '../components/locationBar';

class resultsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { GoogleResults: '' };
  }
  render() {
    const { data } = this.props;
    return (
      <div>
        <LocationBar />
        <GoogleList GoogleResults={data} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.GoogleResults
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(resultsComp);
