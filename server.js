const express = require("express");
const app = express();
app.listen(300, () => console.log("the server has been initiated: 300"));
app.use(express.static("public"));
