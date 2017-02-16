import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListView from './ListView';

class GoogleList extends Component {
  render() {
    console.log('in GoogleList, this.props', this.props.GoogleResults[0])
    let GoogleResultsOffices = this.props.GoogleResults[0].offices || [];
    let GoogleResultsOfficials = this.props.GoogleResults[0].officials || [];

    let GoogleResults = GoogleResultsOffices.map((Office, index) => {
      let key = Office._id || index;
      let profile = GoogleResultsOfficials[Office.officialIndices[0]];
      let title = Office.name;
      let name = profile.name;
      let party = profile.party;
      let phoneNum = profile.phones[0];

      return (<ListView key={key} title={title} name={name} party={party} phone={phoneNum} />);
    });

    return (
      <div className="GoogleList">
        {GoogleResults}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    GoogleResults: state.GoogleResults
  };
}


export default connect(mapStateToProps)(GoogleList);
