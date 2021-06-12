// https://frontendmasters.com/courses/firebase-react-v2/higher-order-components/
import React from "react";
import { UserContext } from "../providers/UserProvider";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

// I have written something very similar to this before;
const withUser = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <UserContext.Consumer>
        {(user) => <Component user={user} {...props} />}
      </UserContext.Consumer>
    );
  };

  // for debugging purposes; redux already does this for you out of the box
  WrappedComponent.displayName = `WithUser(${getDisplayName(
    WrappedComponent
  )})`;

  return WrappedComponent;
};

export default withUser;
