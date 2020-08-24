const express = require('express');
const app = express();

//Middleware to get into the JDCP controller module
app.use(express.static("public"));
app.use("/jdcp",require("./controllers/jdcpController.js"));

//Redirecting to JDCP endpoint
app.get ("/", (req,res)=>{
    res.redirect("/jdcp");
});
//Starting up Server
app.listen(3000,() => {
    console.log("JDCP Server Listening...");
});