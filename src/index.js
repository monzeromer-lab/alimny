/* eslint-disable no-undef */
const express = require("express");
const http = require("http");
const path = require("path");
const PORT = require("./config/keys.json").port;
const HOST = require("./config/keys.json").host;
const webSocketEvent = require("./config/webSocketEvents.json");
const webSocketNatifications = require("./websockets/natifications");
const webSocketOptions = require("./config/webSocketOptions.json");
const RateLimit = require("express-rate-limit");
require("stackify-node-apm");

const limiter = RateLimit({
    max: 10,
    windowMs: 1000 * 60,
    message: {error : true, message: "Rate Limited!" , data : []}
});

/* create the request Listener */
const app = express();

/* create the web server */
const server = http.createServer(app);

/* routes files */
const auth = require('./routes/auth');
const users = require('./routes/user');

/* handle Json */
app.use(express.json());

/* Rate Limit */
app.use(limiter);

/* serving static files */
// eslint-disable-next-line quotes
app.use("/public" , express.static(path.join(__dirname, '../public')));

/* mount routes */
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);

/* built in Routers */
app.use("*" , (req , res)=>{
    console.log(req.url);
        res.status(404).json({error : true , message: "not found!" , data : []}); 
});

/* Error Handler */
app.use(function (err, req, res) {
    console.log(err.stack);
    res.status(500).json({error : true , message : `It's okay it's not your device! our server down! error message : ${err.message} error log:  ${err.stack}`});
});


/* port listener */
server.listen(PORT || 3000 , () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

// Handle unhandled promsie rejection
process.on('unhandledRejection',(error,promsie) => {
	console.log(`Error: ${error.message}`)
	//close the server and exit
	server.close(() => process.exit(1))
})

module.exports = app;

/* webSockets */
const webSocket = require("socket.io")(server, webSocketOptions);

webSocket.on(webSocketEvent.connaction, webSocketNatifications.online );