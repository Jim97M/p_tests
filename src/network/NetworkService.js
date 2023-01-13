import axios from "axios";

axios.defaults.headers.common = {
    "x-apikey": "63be7360969f06502871ad7f",
  };

export default axios.create({
    baseURL: "https://touchinspiration-0ada.restdb.io", 
    headers: {
        "Content-Type": "application/json",
      } 
})
