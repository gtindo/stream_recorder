var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get("/", (req, res) => {
	res.render("client.ejs");
});


io.on('connection', (socket) => {
   socket.on('register', (message) => {
      data = JSON.parse(message);
      clientId = data["clientId"];
			socket.join(clientId);
			
			console.log(clientId);
     
      //Broadcast to all connection of the same client
      io.to(clientId).emit("registration", "New connection registered");
   });
});

app.get("/http-socket/:clientId", (req, res) => {
	//receive http request and send response to all connection registered with clientId
	//Same process can be done with an AMQP consumer
	var clientId = req.params.clientId;
	try{
		io.to(clientId).emit("http", "Message sent with http context"); //broadcast to all connections
		return res.status(200).json({status: "success"})
	}catch(e){
		return res.status(500).json({status: "error"});
	}
})

http.listen(3000, () => {
  console.log('listening on *:3000');
});