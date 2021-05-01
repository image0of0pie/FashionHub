import { URLS } from "../Auth/BackendUrl";

const axios = require("axios");

const checkIfAuthenticated = (setUser, setAuth, setAdmin) => {
  // make an axios call
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
};

export default checkIfAuthenticated;
