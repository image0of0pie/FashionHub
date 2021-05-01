import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Register from "./Pages/Register";
import Boutique from "./Pages/Boutique";
import PrivateRoute from "./Components/PrivateRoute";
import CartScreen from "./Pages/CartScreen";
import "./App.css";
import AuthContext from "./context";
import AuthService from "./Auth/AuthenticationService";
import Console from "./Components/Console";
import ItemView from "./Pages/ItemView";
import Test from "./Pages/Test";
function App() {
  const [auth, setAuth] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [admin, setAdmin] = React.useState(false);
  React.useEffect(() => {
    AuthService(setUser, setAuth, setAdmin);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, user, setUser, admin, setAdmin }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Home />} />
          <Route exact path="/login" render={(props) => <Login />} />
          <Route exact path="/register" render={(props) => <Register />} />
          <Route
            exact
            path="/console"
            authed={admin}
            render={(props) => <Console />}
          />
          <PrivateRoute
            authed={auth}
            exact
            path="/boutique"
            component={Boutique}
          />
          <Route exact path="/item/:id" render={(props) => <ItemView />} />
          <PrivateRoute
            authed={auth}
            exact
            path="/account/cart"
            component={CartScreen}
          />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
