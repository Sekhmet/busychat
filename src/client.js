global.Olm = require("olm");
const sdk = require("matrix-js-sdk");

const id = process.env.REACT_APP_ID;
const token = process.env.REACT_APP_TOKEN;

export default sdk.createClient({
  baseUrl: "http://localhost:8008",
  accessToken: token,
  userId: id
});
