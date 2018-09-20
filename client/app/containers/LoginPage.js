import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../utils/Storage';
import SignIn from '../components/Login/SignIn/SignIn';
import Loading from '../components/Common/Loading';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

  } 

  componentDidMount(){
    const obj = getFromStorage('FB360_Token');
    if(obj && obj.token){
      const { token } = obj;
      // Verify token
      fetch('account/verify?token='+token)
        .then(res => res.json())
        .then(json => {
          // If token okay, the user is logged, so redirect to organizations page
          if(json.success) {
            this.redirectOrganizations();
          } else {
            this.setState({
              isLoading: false
            });
          }
      });
    } else {
        this.setState({
          isLoading: false
        });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          // set our token on storage
          setInStorage('FB360_Token', { 
            token: json.token,
            user: json.user
          });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  redirectOrganizations(){
    this.props.history.push('/organizations');
  }

  render() {

    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;
    
    if(isLoading)
      return (<Loading />);

    if(!token){
      return (
        <section className="login-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <SignIn 
                  email={signInEmail} 
                  password={signInPassword} 
                  onTextboxChangeSignInEmail={this.onTextboxChangeSignInEmail}
                  onTextboxChangeSignInPassword={this.onTextboxChangeSignInPassword}
                  onSignIn={this.onSignIn}
                  error={signInError}
                />
              </div>
            </div>
          </div>
        </section>
      );
    }
    this.redirectOrganizations();
    return(null);
    
  }
}

export default Login;