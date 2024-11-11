const express = require("express");
const indexRouter = require("./routes/index.js");

const { auth } = require('express-openid-connect');
require("dotenv").config();


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
  };
  
  // auth router attaches /login, /logout, and /callback routes to the baseURL

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded( { extended:true }))
app.use(express.static("public"))
app.use(auth(config));

app.use("/", indexRouter);
app.use("/run", indexRouter);


app.listen(3000, () => {
    console.log("Express is running in port 3000")
});