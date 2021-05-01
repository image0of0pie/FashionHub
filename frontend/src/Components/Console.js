import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
} from "@material-ui/core";
import { VictoryPie } from "victory";
import { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Modal from "@material-ui/core/Modal";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { URLS } from "../Auth/BackendUrl";
import AppBar from "./AppBar";
import { withRouter } from "react-router-dom";
const axios = require("axios");
const Console = () => {
  const [dataSummary, setDataSummary] = React.useState({
    "NEW ARRIVAL": "10",
    MALE: "10",
    Permission: "ALLOWED",
    OLDER: "10",
    FEMALE: "10",
  });
  const [arrivalData, setArrivalData] = React.useState([
    { x: "New Arrival", y: dataSummary["NEW ARRIVAL"] },
    { x: "Older", y: dataSummary.OLDER },
  ]);
  const [sexData, setSexData] = React.useState([
    { x: "Female", y: dataSummary.FEMALE },
    { x: "Male", y: dataSummary.MALE },
  ]);
  const [id, setId] = useState("");
  const [sex, setSex] = useState("");
  const [dresstype, setDresstype] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [arrival, setArrival] = useState("");
  const [mode, setMode] = useState("V");
  const [preview, setShowPreview] = useState(false);
  const SUMMARY_URL = URLS.ADMIN_SUMMARY;
  const CLOTH_FETCH_URL = URLS.ADMIN_GET;
  React.useEffect(() => {
    axios.default
      .get(SUMMARY_URL)
      .then((res) => {
        console.log(res);
        setDataSummary(res.data);
        console.log(dataSummary);
        setArrivalData([
          { x: "New Arrival", y: dataSummary["NEW ARRIVAL"] },
          { x: "Older", y: dataSummary.OLDER },
        ]);
        setSexData([
          { x: "Female", y: dataSummary.FEMALE },
          { x: "Male", y: dataSummary.MALE },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleRequests = async () => {
    if (mode === "V") {
      const final_url = CLOTH_FETCH_URL + `?id=${id}`;

      await axios.default
        .get(final_url)
        .then((res) => {
          console.log(res.data.product);
          setId(res.data.product.id);
          setSex(res.data.product.a_sex);
          setDresstype(res.data.product.b_dresstype);
          setImage(res.data.product.c_image);
          setPrice(res.data.product.d_price);
          setArrival(res.data.product.e_arrival);
          setDiscount(res.data.product.f_discount);
        })
        .catch((err) => alert);
    } else if (mode === "D") {
      const final_url = CLOTH_FETCH_URL + `?id=${id}`;
      await axios.default
        .delete(final_url)
        .then((res) => {
          alert(res);
        })
        .catch((err) => alert(err));
    } else {
      const payload = {
        id: id === "" ? -1 : id,
        a_sex: sex,
        b_dresstype: dresstype,
        c_image: image,
        d_price: price,
        e_arrival: arrival,
        f_discount: discount,
      };
      await axios.default
        .put(CLOTH_FETCH_URL, payload)
        .then((res) => {
          setId(res.data.product.id);
          setSex(res.data.product.a_sex);
          setDresstype(res.data.product.b_dresstype);
          setImage(res.data.product.c_image);
          setPrice(res.data.product.d_price);
          setArrival(res.data.product.e_arrival);
          setDiscount(res.data.product.f_discount);
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <div>
      <AppBar />
      <Grid container spacing={2} style={{ padding: 20, marginBottom: 50 }}>
        <Grid item xs={6}>
          <Paper>
            <VictoryPie
              data={arrivalData}
              colorScale={["blue", "grey"]}
              innerRadius={80}
              width={700}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <VictoryPie
              data={sexData}
              colorScale={["grey", "blue"]}
              innerRadius={80}
              width={700}
            />
          </Paper>
        </Grid>
        <Grid container alignContent="space-between">
          <Grid container direction="column" xs={1} style={{ padding: 20 }}>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: mode === "V" ? "lightblue" : "#999999",
              }}
              onClick={() => setMode("V")}
            >
              View
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => setMode("I")}
              style={{ backgroundColor: mode === "I" ? "#66ff66" : "#999999" }}
            >
              Upsert
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => setMode("D")}
              style={{ backgroundColor: mode === "D" ? "red" : "#999999" }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                handleRequests();
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid container direction="column" xs={10} style={{ padding: 20 }}>
            <TextField
              id="filled-multiline-flexible"
              label="Id"
              value={id}
              onChange={(event) => setId(event.target.value)}
              variant="filled"
            />
            <FormControl component="fieldset" disabled={mode !== "I"}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={sex}
                onChange={(event) => setSex(event.target.value)}
              >
                <Grid container direction="row">
                  <FormControlLabel
                    value="FEMALE"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="Male"
                  />
                </Grid>
              </RadioGroup>
            </FormControl>
            <TextField
              disabled={mode !== "I"}
              id="filled-multiline-flexible"
              label="Dresstype"
              value={dresstype}
              onChange={(event) => setDresstype(event.target.value)}
              variant="filled"
            />

            <FormControl component="fieldset" disabled={mode !== "I"}>
              <FormLabel component="legend">Arrival</FormLabel>

              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={arrival}
                onChange={(event) => setArrival(event.target.value)}
              >
                <Grid container direction="row">
                  <FormControlLabel
                    value="old"
                    control={<Radio />}
                    label="Old"
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="New Arrival"
                  />
                </Grid>
              </RadioGroup>
            </FormControl>
            <TextField
              disabled={mode !== "I"}
              id="filled-multiline-flexible"
              label="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              variant="filled"
            />
            <TextField
              disabled={mode !== "I"}
              id="filled-multiline-flexible"
              label="Discount"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
              variant="filled"
            />
            <div>
              <TextField
                disabled={mode !== "I"}
                label="Image Url"
                id="filled-multiline-flexible"
                variant="filled"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
              <Button
                disabled={mode !== "I"}
                variant="contained"
                style={{ backgroundColor: "#aaffff" }}
                onClick={() => setShowPreview(true)}
              >
                Preview
              </Button>
            </div>
            <Modal
              open={preview}
              onClose={() => setShowPreview(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div>
                <img
                  src={
                    image.startsWith("data:image/") ? image : "https://" + image
                  }
                  height={400}
                  width={400}
                />
              </div>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Console);
