import React from "react";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
} from "@material-ui/core";
import Logo from "../assets/FormLogo.png";
import { Face, Fingerprint } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../context";
import HomeIcon from "@material-ui/icons/Home";
import { URLS } from "../Auth/BackendUrl";

const axios = require("axios");

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 14,
  },
  padding: {
    padding: theme.spacing.unit * 3.3,
  },
  root: {
    backgroundColor: "#fcf2f8",
    padding: "1em",
  },
});

function LoginTab(props) {
  const LOGIN_URI = URLS.LOGIN;
  const { auth, setAuth, user, setUser, admin, setAdmin } = React.useContext(
    AuthContext
  );
  React.useEffect(() => {
    const AUTH_URI = URLS.AUTH;
    axios
      .get(AUTH_URI)
      .then((response) => {
        if (response.data.AUTHENTICATED === true) {
          setAuth(true);
          setUser(response.data.USER);
          setAdmin(response.data.USER.appUserRole === "ADMIN" ? true : false);
        } else {
          setAuth(false);
          setUser(null);
          setAdmin(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  if (auth) {
    props.history.push("/");
  }

  const [state, setState] = React.useState({
    email: {
      value: "",
      error: null,
    },
    password: {
      value: "",
      error: null,
    },
  });
  console.log(user);
  const handleSubmit = () => {
    console.log("Trying to login");
    const params = new URLSearchParams();
    params.append("username", state.email.value);
    params.append("password", state.password.value);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(LOGIN_URI, params, config)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
    axios.default
      .get(URLS.AUTH)
      .then((res) => {
        console.log(res);
        if (res.data.AUTHENTICATED === true) {
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios.default
      .get(URLS.AUTH)
      .then((res) => {
        console.log(res);
        if (res.data.AUTHENTICATED === true) {
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: { value: e.target.value, error: null },
    });
  };

  const { classes } = props;

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={4}
      className={classes.root}
      style={{ backgroundColor: "rgb(255,190,190,0.9)" }}
    >
      <Paper
        className={classes.padding}
        style={{ backgroundColor: "rgb(255,190,190,0.9)" }}
      >
        <Grid container justify="center">
          <Grid item>
            <img
              src={Logo}
              style={{
                height: 620,
                width: 620,
                borderRadius: 100,
                marginTop: 80,
                padding: 10,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <Grid container justify="center" spacing={8} alignItems="center">
            <Grid item>
              <Link to="/">
                <Typography
                  variant="h1"
                  style={{
                    fontFamily: "Lobster,cursive",
                    color: "#f224a0",
                    marginTop: 70,
                  }}
                >
                  FashionHub
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="Email"
                type="email"
                name="email"
                value={state.email.value}
                onChange={handleChange}
                fullWidth
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                state={state.password.value}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: 40 }}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleSubmit}
              style={{ textTransform: "none" }}
            >
              Login
            </Button>
          </Grid>
          <Grid container justify="center" style={{ marginTop: 20 }}>
            Don't have an account
            <Link to="/register">
              <Typography variant="" color="primary">
                SignUp
              </Typography>
            </Link>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
}

export default withRouter(withStyles(styles)(LoginTab));
