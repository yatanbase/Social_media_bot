const express = require("express");
const app = express();
const Instagram = require("instagram-web-api");

require("dotenv").config();

const port = process.env.PORT || 4000;

const instaLogin = () => {
    const user = new Instagram ({
        username : process.env.INSTAGRAM_USERNAME,
        password : process.env.INSTAGRAM_PASSWORD
    })
}