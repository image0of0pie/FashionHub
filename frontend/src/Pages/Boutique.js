import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Appbar from "../Components/AppBar";

import {
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Avatar,
} from "@material-ui/core";
import data from "../data";
import DressCard from "../Components/DressCard";
import { Search } from "@material-ui/icons";
import axios from "axios";
import AuthContext from "../context";
import { withRouter } from "react-router";
import { Favorite, ShoppingCart } from "@material-ui/icons";
import Modal from "@material-ui/core/Modal";
import { useParams } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import TagFacesRoundedIcon from "@material-ui/icons/TagFacesRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { URLS } from "../Auth/BackendUrl";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "rgb(255,100,100,0.9)",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#1111ff",
    },
    tertiary: {
      main: "blue",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  heading: {
    fontFamily: "Lobster,cursive",
    color: "#fc30d0",
  },
  image: {
    borderRadius: "40px",
  },
  end: {
    display: "flex",
    justifyContent: "flex-end",
  },
  searchItem: {
    padding: 5,
    borderRadius: "50px",
    margin: "0.5em",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mimage: {
    height: "300px",
    width: "250px",
    borderRadius: "40px",
  },
}));
const Products = () => {
  const classes = useStyles();

  const { user, auth } = React.useContext(AuthContext);

  const [PRODUCTS_BY_SEX_PAGINATION_URL, setURL] = React.useState(
    `/api/v1/clothes/?sex=${user.gender}&page=`
  );
  const PRODUCTS_BY_SEARCH_URL = "/api/v1/dresses/?dress=";
  const ORDER_URL = URLS.ORDERS;

  const [posts, setPosts] = React.useState([]);

  const [total, setTotal] = React.useState(0);
  const [current, setCurrent] = React.useState(0);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(PRODUCTS_BY_SEX_PAGINATION_URL + current)
      .then((response) => {
        console.log(response);
        setCurrent(current + 1);
        setTotal(response.data.total);
        setPosts(response.data.products);
      })
      .catch((err) => console.log(err));

    axios
      .get(ORDER_URL)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.products);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleShowMorePosts = () => {
    axios.get(PRODUCTS_BY_SEX_PAGINATION_URL + current).then((response) => {
      setCurrent(current + 1);
      setTotal(response.data.total);
      setPosts([...posts, ...response.data.products]);
    });
  };

  
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      axios
        .get(PRODUCTS_BY_SEARCH_URL + search)
        .then((response) => {
          setPosts(response.data.products);
          setTotal(response.data.length);
          setCurrent(response.data.length);
        })
        .catch((err) => console.log(err));
    }
  };

  const getDressesBySex = (sex) => {
    const PRODUCTS_BY_SEX = `/api/v1/clothes/?sex=${sex}&page=`;
    setURL(PRODUCTS_BY_SEX);
    axios
      .get(PRODUCTS_BY_SEX_PAGINATION_URL + 0)
      .then((response) => {
        console.log(response);
        setCurrent(1);
        setURL(PRODUCTS_BY_SEX_PAGINATION_URL);
        setTotal(response.data.total);
        setPosts(response.data.products);
      })
      .catch((err) => console.log(err));
  };

  const SESSION_PERSIST_URL = URLS.SESSION_PERSIST;
  const ADD_TO_CART_URL = URLS.ADD_TO_CART;

  const [open, setOpen] = React.useState(false);
  const [dress, setDress] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AddtoCart = () => {
    var payload = {
      productId: dress.id,
      quantity: 1,
    };

    axios
      .post(ADD_TO_CART_URL, payload)
      .then((response) => {
        if (response.status === 200) {
          alert("Added to cart!");
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePersist = () => {
    var msg = dress.e_arrival.toLowerCase() === "old" ? "O" : "N";
    axios
      .get(SESSION_PERSIST_URL + msg)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const body = () => {
    const g_color = dress.a_sex === "MALE" ? "#999999" : "#1111ff";
    return (
      <Grid
        container
        alignItems="center"
        style={{ backgroundColor: g_color }}
        justify="center"
        direction="column"
      >
        <Grid item>
          <img src={`https://${dress.c_image}`} className={classes.mimage} />
        </Grid>
        <Grid item>
          <Typography variant="h4">{dress.b_dresstype}</Typography>
        </Grid>

        {dress.e_arrival.toLowerCase() === "old" ? (
          <Grid item>
            <Typography variant="h5">
              Price :
              <span style={{ textDecoration: "line-through" }}>
                ₹ {dress.d_price}
              </span>{" "}
              <span style={{ color: "red" }}>{dress.f_discount}</span>
            </Typography>
          </Grid>
        ) : (
          <Grid>₹ {dress.d_price}</Grid>
        )}
        <Grid container spacing={2}>
          <Grid item>
            <IconButton onClick={AddtoCart}>
              <ShoppingCart />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handlePersist}>
              <Favorite color="secondary" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  // Modal things end

  const handleClick = (i) => {
    setDress(posts[i]);

    setOpen(true);
  };

  const renderDresses = (posts) => {
    let arr = [];
    for (let i = 0; i < posts.length; i += 2) {
      if (i !== posts.length - 1) {
        arr.push(
          <Grid container justify="center" spacing={2}>
            <Grid xs={12} sm={4} item onClick={() => handleClick(i)}>
              <DressCard dress={posts[i]} />
            </Grid>
            <Grid xs={12} sm={4} item onClick={() => handleClick(i + 1)}>
              <DressCard dress={posts[i + 1]} />
            </Grid>
          </Grid>
        );
      } else {
        arr.push(
          <Grid container justify="center">
            <Grid xs={12} sm={4} item onClick={() => handleClick(i)}>
              <DressCard dress={posts[i]} />
            </Grid>
          </Grid>
        );
      }
    }
    return arr;
  };

  var testItem = {
    "Unnamed: 0": 0,
    a_sex: "MALE",
    b_dresstype: "Round-neck T-shirt Regular Fit",
    c_image:
      "lp2.hm.com/hmgoepprod?set=source[/d8/12/d812412329a628300624e1661969be84286fe637.jpg],origin[dam],category[men_tshirtstanks_shortsleeve],type[DESCRIPTIVESTILLLIFE],res[m],hmver[1]&call=url[file:/product/style]",
    d_price: "Rs.399",
    e_arrival: "old",
    f_discount: 121,
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Appbar shop={products.length} admin={true} />
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: "1.5em", marginBottom: "1.5em" }}
        >
          <Grid item>
            <Search />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Search for dress categories"
              value={search}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter dress type like tshirt ..."
              fullWidth
              autoFocus
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid xs={12} sm={3} container item>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              direction="column"
            >
              <Grid item className={classes.searchItem}>
                <Chip
                  avatar={<TagFacesRoundedIcon />}
                  label="Male"
                  color="tertiary"
                  onClick={() => getDressesBySex("MALE")}
                />
              </Grid>
              <Grid item className={classes.searchItem}>
                <Chip
                  avatar={<FaceRoundedIcon />}
                  label="Female"
                  color="secondary"
                  onClick={() => getDressesBySex("FEMALE")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={9}>
            {renderDresses(posts)}
            <Grid
              container
              item
              justify="center"
              onClick={() => handleOpen(true)}
            >
              {current !== total ? (
                <Button
                  style={{ marginTop: 30 }}
                  variant="outlined"
                  color="primary"
                  onClick={handleShowMorePosts}
                >
                  {" "}
                  Load more
                </Button>
              ) : (
                <Typography variant="h5">
                  Search with proper keywords{" "}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          <div>{dress !== null ? body() : <div></div>}</div>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default withRouter(Products);
