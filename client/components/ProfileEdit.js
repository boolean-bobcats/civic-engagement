import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import { setLoggedIn } from '../actions/loggingActions';
import ImageUpload from './ImageUpload';

const profileSidebarStyle = {
  position: 'absolute',
  right: '75px',
  top: '100px',
  width: '300px',
  border: '3px solid',
  padding: '10px',
  marginRight: '100px'
};

const inputStyle = {
  minWidth: '700px',
  minHeight: '100px'
};

const profileInfoStyle = {
  paddingTop: '30',
  paddingLeft: '150px',
  paddingBottom: '60px'
};

const editPanelStyle = {
  paddingLeft: '110px',
  paddingTop: '30px',
  paddingBottom: '50px'
};

function mapStateToProps(state) {
  return {
    UserData: state.LoggedIn.userData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setLoggedIn }, dispatch);
}

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.UserData.username || 'n/a',
      location: this.props.UserData.location || 'n/a',
      issues: this.props.UserData.issues || 'n/a',
      quote: this.props.UserData.quote || 'n/a',
      aboutme: this.props.UserData.aboutme || 'n/a',
      createAt: this.props.UserData.createdAt || 'n/a',
      image: this.props.UserData.image || 'n/a',
      log: true
    };

    this.handleIssuesChange = this.handleIssuesChange.bind(this);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleAboutMeChange = this.handleAboutMeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleIssuesChange(e) {
    this.setState({ issues: e.target.value });
  }

  handleQuoteChange(e) {
    this.setState({ quote: e.target.value });
  }

  handleAboutMeChange(e) {
    this.setState({ aboutme: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleSubmit() {
    Axios.post('/api/users/update', {
      location: this.state.location,
      issues: this.state.issues,
      quote: this.state.quote,
      aboutme: this.state.aboutme,
      image: this.state.image
    }).then((resp) => {
      console.log('we have returned from the server with gooold!', resp.data);
      if (resp.status === 200) {
        Cookies.set('com.CivicsPortal', resp.data.token, { expires: 7 });
        this.props.setLoggedIn(resp.data.user);
      } else {
        console.log('did not receive "200" status');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleLogout() {
    Cookies.remove('com.CivicsPortal');
    this.setState({ log: false }, () => { console.log('log', this.state.log); })
  }

  render() {
    return (

    <div>
      <h1 style={{ textAlign: 'center' }}> Welcome to your profile </h1>
      <div>
        <div style={profileSidebarStyle}>
          { this.state.image ? <img src={this.state.image} /> : null }
          <em>{this.props.UserData.username}</em>
          <br />
          profile created on:
          <br />
          {dateFormat(this.props.UserData.createdAt)}
          <br />
          <button style={{ float: 'right' }}onClick={this.handleLogout} >Logout </button>
        </div>
        <div style={profileInfoStyle}>
          <p className='profileTopic' >Top 3 Issues I care about </p>
          <div> {this.props.UserData.issues || 'n/a'} </div>
          <p className='profileTopic'>Top Quote</p>
          <div>{this.props.UserData.quote || 'n/a'}</div>
          <p className='profileTopic'>Who I Am</p>
          <div>{this.props.UserData.aboutme || 'n/a'}</div>
          <p className='profileTopic'>Location</p>
          <div>{this.props.UserData.location || 'n/a'}</div>
        </div>
      </div>
      <div style={editPanelStyle}>
        <form onSubmit={this.handleSubmit} >
          <Accordion>
            <AccordionPanel heading="Edit Issues">
              <Paragraph>
                <input style={inputStyle} type="text" name="issues" value={this.state.issues} placeholder="Issues" onChange={this.handleIssuesChange} />
              </Paragraph>
            </AccordionPanel>
            <AccordionPanel heading="Edit Top Quote">
              <Paragraph>
                <input style={inputStyle} type="text" name="quote" value={this.state.quote} placeholder="Quote" onChange={this.handleQuoteChange} />
              </Paragraph>
            </AccordionPanel>
            <AccordionPanel heading="Edit Who I Am">
              <Paragraph>
                <input style={inputStyle} type="text" name="aboutMe" value={this.state.aboutme} placeholder="About Me" onChange={this.handleAboutMeChange} />
              </Paragraph>
            </AccordionPanel>
            <AccordionPanel heading="Edit Location">
              <Paragraph>
                <input style={inputStyle} type="text" name="aboutMe" value={this.state.location} placeholder="Location" onChange={this.handleAboutMeChange} />
              </Paragraph>
              </AccordionPanel>
            <AccordionPanel heading="Edit Profile Photo">
              <Paragraph>
                <ImageUpload />
              </Paragraph>
            </AccordionPanel>
          </Accordion>
          <input style={{ paddingTop: '20px', paddingBottom: '20px' }} type="submit" value="Submit Changes" />
        </form>
        { !this.state.log ? <Redirect to={{ pathname: '/' }} /> : null }
      </div>
    </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
