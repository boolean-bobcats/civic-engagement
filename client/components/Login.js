import React from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', valid: false };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Email and pword submitted ', this.state.email + this.state.password);
    Axios.post('/api/users/signin', {
      username: this.state.email,
      password: this.state.password
    }).then((resp) => {
      if (resp.status === 200) {
        Cookies.set('com.CivicsPortal', resp.data.token, { expires: 7 });
      } else {
        console.log('did not receive "200" status');
      }
    })
      .then(() => {
        this.setState({ valid: true });
      })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <h2 >Please login</h2>
          <h3>E-mail</h3>
          <input type="text" name="username" placeholder="Email Address" onChange={this.handleEmailChange} />
          <h3>Password</h3>
          <input type="password" name="password" placeholder="Password" onChange={this.handlePasswordChange} />
          <input type="submit" value="Login"/>
        </form>
        {
           this.state.valid ? <Redirect to={{ pathname: '/auth' }} /> : (null)
         }
      </div>)
  }
}

export default Login;
