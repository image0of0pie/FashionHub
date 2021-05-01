import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
                message: "Please log in or sign up to continue",
                redirectUrl: window.location.href,
              },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
