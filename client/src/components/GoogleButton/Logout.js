import React from "react";
import { GoogleLogout } from "react-google-login";
import dotenv from "dotenv";
import Button from "react-bootstrap/Button";

dotenv.config();

const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

const Logout = (props) => {
  return (
    <div>
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={props.signOutOnSuccess}
        onFailure={props.signOutOnFailure}
        render={(renderProps) => (
          <Button
            className="button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Logout
          </Button>
        )}
      />
    </div>
  );
};

export default Logout;
