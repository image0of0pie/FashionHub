import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import { Menu, Grid, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import { ShoppingBasket, Input } from "@material-ui/icons";
import MoreIcon from "@material-ui/icons/MoreVert";
import AuthContext from "../context";
import Logof from "../assets/logof.png";
import { withRouter } from "react-router";
import ShopIcon from "@material-ui/icons/Shop";
import { URLS } from "../Auth/BackendUrl";
import axios from "axios";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: "500",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(255,255,255,0.6)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.8)",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "white",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function PrimarySearchAppBar(props) {
  const classes = useStyles();

  const { auth, setAuth, user, admin, setAdmin, setUser } = React.useContext(
    AuthContext
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    axios
      .get(URLS.LOGOUT)
      .then((response) => {
        if (response.status === 200) {
          setAuth(false);
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setAuth(false);
    setUser(null);
    setAdmin(false);
    props.history.push("/");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
  var isBoutiqueScreen = window.location.href.includes("boutique");
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {admin ? (
          <Grid item style={{ padding: "0.5em" }}>
            <IconButton onClick={() => props.history.push("/console")}>
              <DeveloperBoardIcon large style={{ color: "white" }} />
            </IconButton>
          </Grid>
        ) : null}
        {isBoutiqueScreen ? (
          <IconButton
            onClick={() => props.history.push("/account/cart")}
            color="inherit"
          >
            <Badge badgeContent={props.shop}>
              <ShoppingBasket />
            </Badge>
          </IconButton>
        ) : (
          <IconButton
            onClick={() => props.history.push("/boutique")}
            color="inherit"
          >
            <ShopIcon />
          </IconButton>
        )}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => props.history.push("/")}
          >
            <img
              src={Logof}
              height={50}
              width={50}
              style={{ borderRadius: 50 }}
            />
          </IconButton>
          <Typography className={classes.title} variant="h4" noWrap>
            FashionHub
          </Typography>
          <div className={classes.grow} />
          {admin ? (
            <Grid item style={{ padding: "0.5em" }}>
              <IconButton onClick={() => props.history.push("/console")}>
                <DeveloperBoardIcon large style={{ color: "white" }} />
              </IconButton>
            </Grid>
          ) : null}
          {isBoutiqueScreen ? (
            <IconButton
              onClick={() => props.history.push("/account/cart")}
              color="inherit"
            >
              <Badge badgeContent={props.shop}>
                <ShoppingBasket />
              </Badge>
            </IconButton>
          ) : (
            <IconButton
              onClick={() => props.history.push("/boutique")}
              color="inherit"
            >
              <ShopIcon />
            </IconButton>
          )}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default withRouter(PrimarySearchAppBar);
