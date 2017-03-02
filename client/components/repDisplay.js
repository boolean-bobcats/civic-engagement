import shortid from 'shortid';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RepBio from './repBio';
import RepBillsList from './repBillsList';
import RepVoteStats from './repVoteStats';

import { bio, bills, votes } from '../actions/politicianSearchActions';
import testing from '../actions/locationBarActions';

/* this component will need a location
 * already searched and seeded into app state */
class RepDisplay extends Component {
  constructor(props) {
    super(props);
  // }

  // componentWillMount() {
    
    // seed a location and some reps for testing
    // this.props.testing('1216 broadway ny ny');

    const names = [
      'Charles E. Schumer',
      'Kirsten E. Gillibrand',
      'Carolyn B. Maloney'
    ];
    names.forEach((name) => {
      this.props.bio(name);
      this.props.bills(name);
      this.props.votes(name);
    });
    // delete the crap above for production
   
    // below should work for production
    // this.props.reps.forEach((name) => {
    //   this.props.bio(name);
    //   this.props.bills(name);
    //   this.props.votes(name);
    // });
  }
  // componentDidUpdate(nextProps, nextState) {
  // componentDidMount() {

  // componentWillReceiveProps(nextProps) {
  //   // compare lengths for update conditional
  //   const { name, News } = this.props;
  //   if (nextProps.News[name].length > News[name].length) {
  //     // console.log(`recieved news for ${this.props.name}`);
  //     if (!this.state.searched) this.setState({ searched: true });
  //   }
  // }

  render() {
    const { reps, propublica } = this.props;
    // reps have been saved to state! this should always be populated.
    
    if (propublica) {
      const display = require('underscore').map(propublica, (rep) => {
      // const display = reps.map((rep) => {
      //   const { name, party, phones } = rep;
      //   const chamber = rep.urls[0].split('.').reverse()[1];
      //   const title = (chamber === 'house') ?
      //     'Representative' : 'Senator';
              // googleRep={rep}

        return (
          <div key={shortid.generate()}>
            <RepBio
              key={shortid.generate()}
              propublicaRep={propublica[rep.name]}
            />
            <RepVoteStats
              key={shortid.generate()}
              rep={propublica[rep.name]}
            />
            <RepBillsList
              key={shortid.generate()}
              rep={propublica[rep.name]}
            />
          </div>
        );
      });
      return (
        <div>
          <div>{display}</div>
        </div>
      );
    }
    // nothing!
    return (<div>you should not see this usually!</div>);
  }
}

function mapStateToProps(state) {
  return {
    reps: state.GoogleResults.reps,
    propublica: state.Propublica
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ testing, bills, bio, votes }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RepDisplay);
