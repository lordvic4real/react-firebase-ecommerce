import axios from "axios";

const instance = axios.create({
  baseURL: "...", // api url (cloud function)
});

export default instance;
