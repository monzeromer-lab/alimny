const express = require("express");
const http = require("http");
const PORT = require("./config/keys.json").port;
const HOST = require("./config/keys.json").host;
const webSocketEvent = require("./config/webSocketEvents.json");
const webSocketNatifications = require("./websockets/natifications");
const webSocketOptions = require("./config/webSocketOptions.json");
const RateLimit = require("express-rate-limit");
require("stackify-node-apm");


const limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5
});

/* create the request Listener */
const app = express();

/* create the web server */
const server = http.createServer(app);

/* handle Json */
app.use(express.json());

/* Rate Limit */
app.use(limiter);

/* serving static files */
app.use(express.static("public"));

/* external api routers */
app.use("/" , require("./api/index"));

/* built in Routers */
app.get("*" , (req , res)=>{
        res.status(404).json({error : true , message: "not found!" , data : []}); 
});

app.post("*" , (req , res)=>{
    console.log(req.url);
    res.status(404).json({error : true , message: "not found!" , data : []});
});

app.put("*" , (req , res)=>{
    res.status(404).json({error : true , message: "not found!" , data : []});
});

app.delete("*" , (req , res)=>{
    res.status(404).json({error : true , message: "not found!" , data : []});
});

/* Error Handler */
app.use(function (err, req, res) {
    console.log(err.stack);
    res.status(500).json({error : true , message : `It's okay it's not your device! our server down! error message : ${err.message} error log:  ${err.stack}`});
});


/* port listener */
server.listen(PORT,   "192.168.43.41" || HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

module.exports = app;

/* webSockets */
const webSocket = require("socket.io")(server, webSocketOptions);

webSocket.on(webSocketEvent.connaction, webSocketNatifications.online );