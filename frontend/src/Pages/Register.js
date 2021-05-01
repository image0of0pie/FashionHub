import React from "react";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Typography,
  IconButton,
} from "@material-ui/core";
import AuthContext from "../context";
import { Link, withRouter } from "react-router-dom";
import Logo from "../assets/FormLogo.png";
import { Face, Fingerprint, AccountCircle, Email } from "@material-ui/icons";
import axios from "axios";
import { URLS } from "../Auth/BackendUrl";

const styles = (theme) => ({
  margin: {
    marginRight: theme.spacing.unit * 14,
    marginLeft: theme.spacing.unit * 14,
    marginTop: theme.spacing.unit * 12,
  },
  padding: {
    padding: theme.spacing.unit * 2,
  },
  root: {
    height: "auto",
    backgroundColor: "#fcf2f8",
    padding: "1em",
  },
});

function Register(props) {
  const REGISTER_URI = URLS.REGISTER;
  const { auth } = AuthContext;
  if (auth) {
    props.history.push("/");
  }
  const [state, setState] = React.useState({
    firstname: {
      value: "",
      error: null,
    },
    lastname: {
      value: "",
      error: null,
    },
    email: {
      value: "",
      error: null,
    },
    password: {
      value: "",
      error: null,
    },
    username: {
      value: "",
      error: null,
    },
    gender: {
      value: "MALE",
      error: null,
    },
    role: {
      value: "USER",
      error: null,
    },
    token: {
      value: "",
      error: null,
    },
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: { value: e.target.value, error: null },
    });
  };

  const handleSubmit = () => {
    const payload = {
      firstName: state.firstname.value,
      lastName: state.lastname.value,
      userName: state.username.value,
      password: state.password.value,
      email: state.email.value,
      gender: state.gender.value,
      role: state.role.value,
      token: state.token.value,
    };

    axios
      .post(REGISTER_URI, payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          props.history.push("/login");
        }
      })
      .catch((err) => console.log(err));
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
                paddingRight: 10,
                paddingLeft: 10,
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
                  style={{ fontFamily: "Lobster,cursive", color: "#f224a0" }}
                >
                  FashionHub
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="firstname"
                label="First Name"
                name="firstname"
                onChange={handleChange}
                value={state.firstname.value}
                fullWidth
                autoFocus
                required
              />
            </Grid>
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="lastname"
                label="Last Name"
                name="lastname"
                onChange={handleChange}
                value={state.lastname.value}
                fullWidth
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="username"
                name="username"
                onChange={handleChange}
                value={state.username.value}
                fullWidth
                autoFocus
                required
              />
            </Grid>
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={handleChange}
                name="password"
                value={state.password.value}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item>
              <Email />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="email"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                value={state.email.value}
                fullWidth
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Grid container justify="space-evenly" style={{ marginTop: "1.3em" }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={state.gender.value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="MALE"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="N/A"
                  control={<Radio />}
                  label="Rather Not Say"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={state.role.value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="USER"
                  control={<Radio />}
                  label="User"
                />
                <FormControlLabel
                  value="ADMIN"
                  control={<Radio />}
                  label="Admin"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {state.role.value === "ADMIN" ? (
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Token"
                onChange={handleChange}
                name="token"
                value={state.token.value}
                fullWidth
              />
            </Grid>
          ) : null}
          <Grid
            container
            justify="center"
            style={{ marginTop: "20px", paddingBottom: 20 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleSubmit}
              style={{ textTransform: "none" }}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid
            container
            justify="center"
            style={{ marginTop: 20, paddingBottom: 20 }}
          >
            Already have an account
            <Link to="/login">
              <Typography variant="" color="primary">
                Login
              </Typography>
            </Link>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
}

export default withRouter(withStyles(styles)(Register));
