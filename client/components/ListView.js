import React from 'react';

class ListView extends React.Component {
  render() {
    return (
      <div>
        <h3>Name </h3><span className="listViewItem">{this.props.name}</span>
        <h3>Title </h3><span className="listViewItem">{this.props.title}</span>
        <h3>Party </h3><span className="listViewItem">{this.props.party}</span>
        <h3>Phone </h3><span className="listViewItem">{this.props.phone}</span>
      </div>
    );
  }
}

ListView.propTypes = {
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  party: React.PropTypes.string,
  phone: React.PropTypes.string
};

ListView.defaultProps = {
  name: 'n/a',
  title: 'n/a',
  party: 'n/a',
  phone: 'n/a'
};

export default ListView;
