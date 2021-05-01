import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../assets/front-logo.png";
import { Link, withRouter, useParams } from "react-router-dom";
import data from "../data";
import AuthContext from "../context";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { URLS } from "../Auth/BackendUrl";
import DressCard from "../Components/DressCard";
import Appbar from "../Components/AppBar";
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "rgb(255,150,150,0.9)",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "rgb(155,40,240,0.8)",
    },
    tertiary: {
      main: "rgb(255,255,255,1)",
    },
  },
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    fontFamily: "Satisfy,cursive",
    color: "#fc30d0",
  },
  image: {
    borderRadius: "70px",
  },
  end: {
    display: "flex",
    justifyContent: "flex-end",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ItemView = (props) => {
  const { id } = useParams();
  const { auth, setAuth, user, setAdmin, admin, setUser } = React.useContext(
    AuthContext
  );
  const [dress, setDress] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const loadData = async () => {
    await axios
      .get(URLS.CLOTH + `?itemId=${id}`)
      .then((res) => {
        console.log(res);
        setDress(res.data);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Item not Found");
      });
  };
  React.useEffect(() => {
    if (id >= 0) {
      loadData();
    }
  }, []);
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
  }, [auth]);
  const classes = useStyles();
  const lstate = props.history.location.state;
  const cond =
    props.history.location.state !== undefined &&
    props.history.location.state.message !== undefined;
  const [snackOpen, setSnackOpen] = React.useState(cond);
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  const handleLogout = () => {
    axios
      .get(URLS.LOGOUT)
      .then((response) => {
        if (response.status === 200) {
          setAuth(false);
          setUser(null);
          setAdmin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="error">
          Please Login or Signup to continue
        </Alert>
      </Snackbar>
      <ThemeProvider theme={theme}>
        {auth ? (
          <Appbar />
        ) : (
          <AppBar
            position="static"
            color="primary"
            style={{ flexGrow: 1, marginBottom: 5 }}
          >
            <Toolbar>
              <Grid container justify="space-between" xs={12}>
                <Grid justify="flex-start">
                  <Grid item style={{ padding: "0.5em" }}>
                    <Link to="/boutique">
                      <Typography variant="h5" color="tertiary">
                        Boutique
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
                <Grid className={classes.end}>
                  <Grid item style={{ padding: "0.5em" }}>
                    <Link to="/register">
                      <Typography variant="h5" color="tertiary">
                        Register
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item style={{ padding: "0.5em" }}>
                    <Link to="/login">
                      <Typography variant="h5" color="tertiary">
                        Login
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
      </ThemeProvider>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        direction="column"
      >
        <Grid xs={8} sm={8} item>
          {open === true ? (
            <div>
              <DressCard dress={dress} />
            </div>
          ) : (
            <img src={Logo} width="90%" />
          )}
        </Grid>

        <Grid xs={12} sm={6} item>
          <Typography variant="h3" align="center" className={classes.heading}>
            Wanna Look Fancy , Do Expore Our Attire Store
          </Typography>
          <div id="wrapper">
            <div id="container">
              <p className="bouncing-text">Don't miss the ongoing sale</p>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        justify="space-evenly"
        alignItems="center"
        style={{ marginTop: "3em" }}
      >
        <Grid xs={12} sm={3} item>
          <img
            height="100%"
            width="110%"
            src={`https://${data.data[12].image}`}
            className={classes.image}
          />
        </Grid>
        <Grid xs={12} sm={3} item>
          <img
            height="100%"
            width="110%"
            src={`https://${data.data[14].image}`}
            className={classes.image}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(ItemView);
