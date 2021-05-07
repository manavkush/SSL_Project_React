import React from "react";
import { GoogleLogin } from "react-google-login";
import dotenv from "dotenv";
import Button from "react-bootstrap/Button";

dotenv.config();

const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

const Login = (props) => {
  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        hostedDomain="iitdh.ac.in"
        onSuccess={props.signInOnSuccess}
        onFailure={props.signInOnFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={(renderProps) => (
          <Button
            className="button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Login
          </Button>
        )}
      />
    </div>
  );
};

export default Login;
