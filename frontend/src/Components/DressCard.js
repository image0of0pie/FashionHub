import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: "30px",
    maxHeight: "350px",
    maxWidth: "350px",
  },
  paper: {
    margin: "0.2em",
    width: "250px",
    borderRadius: "20px",
  },
}));

const DressCard = ({ dress }) => {
  const g_color = "#aaaaaa";
  const classes = useStyles();

  return (
    <div style={{ borderRadius: "20px" }}>
      <Paper
        outlined
        elevation={10}
        className={classes.paper}
        style={{ backgroundColor: g_color, paddingTop: 20 }}
      >
        <Grid container alignItems="center" direction="column">
          <Grid item container justify="center">
            <img src={`https://${dress.c_image}`} className={classes.image} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="primary">
              {dress.b_dresstype}
            </Typography>
          </Grid>
          {dress.e_arrival.toLowerCase() === "new" ? (
            <p className="shining-text">New Arrival</p>
          ) : (
            <Grid></Grid>
          )}
          {dress.e_arrival.toLowerCase() === "old" ? (
            <Grid item>
              <Typography variant="h6" style={{ display: "inline-block" }}>
                <span style={{ textDecoration: "line-through" }}>
                  ₹ {dress.d_price}
                </span>{" "}
                <span style={{ color: "red" }}>{dress.f_discount}</span>
              </Typography>
              <IconButton
                style={{ display: "inline-block" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.origin.toString() + `/item/${dress.id}`
                  );
                }}
              >
                <ShareIcon />
              </IconButton>
            </Grid>
          ) : (
            <Grid>
              <p style={{ fontSize: 22, display: "inline-block" }}>
                ₹ {dress.d_price}
              </p>
              <IconButton
                style={{ display: "inline-block" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://localhost:3000/${dress.id}`
                  );
                }}
              >
                <ShareIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default DressCard;
