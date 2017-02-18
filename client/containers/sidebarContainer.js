import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/locationBarActions';
import GoogleList from '../components/googleListComponent';
import LocationBar from '../components/locationBar';
import Menu from '../components/sidebar';
import ResultsComp from './reqContainer';

const divStyle = {
  width: '600',
  height: '40px',
  backgroundColor: 'yellow',
  textAlign: 'right'
};

class SidebarContainer extends React.Component {

  render() {
    const { data } = this.props;
    return (
      <div>
        <header>I am a fixed header!</header>
        <Menu />
        <div style={divStyle} >
          <ResultsComp />
        </div>
      </div>
    );
  }
}

export default SidebarContainer;
