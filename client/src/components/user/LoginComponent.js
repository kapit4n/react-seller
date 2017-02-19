'use strict';

import React from 'react';
import GoogleLogin from 'react-google-login';

require('styles/user/Login.css');

class LoginComponent extends React.Component {
  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }
    return (
      <div className="login-component">
        <GoogleLogin
          clientId="468789408403-llgcenutmb840n7diki9kmpdljmvims5.apps.googleusercontent.com"
          onSuccess={responseGoogle} onFailure={responseGoogle} >
          <span> Login with Google</span>
        </GoogleLogin>
      </div>
    );
  }
}

LoginComponent.displayName = 'UserLoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default LoginComponent;
