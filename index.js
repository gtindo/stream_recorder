const Consumer = require('./app/core/consumer');
const configs = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const baseRouter = require('./app/routes/http/base.routes');
const db = require('./app/core/db')

const consumer = new Consumer(configs.REQUEST_QUEUE_NAME);

async function lauchConsumer(){
	try{
		await consumer.connect();
		await consumer.consume();
	}catch(err){
		console.log(error);
	}
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static('static'));

app.use("/", baseRouter);

app.listen(configs.HTTP_PORT, () => {
	console.log(`HTTP Server listening on port ${configs.HTTP_PORT}`);
	lauchConsumer();
});





