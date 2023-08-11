import axios from "axios";

const apiML = axios.create({
  baseURL: "https://api.mercadolibre.com",
});

export { apiML };
