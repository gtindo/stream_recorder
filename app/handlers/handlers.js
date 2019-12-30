const uuid = require("uuid/v4");
const path = require("path");
const Joi = require('@hapi/joi');

const Publisher = require('../core/publisher');
const config = require('../../config');
const schemas = require('../core/validators')


let captureStream = async (link, time, ext) => {
	let file_name = `${uuid()}.${ext}`;
	let file_path = path.join(path.dirname(path.dirname(__dirname)), file_name);

	return new Promise((resolve, reject) => {
		let req = request.get(link, (err, res) => {
			if(err) reject(err);
		}).pipe(fs.createWriteStream(file_path));

		setTimeout(() => {
			req.destroy();
			resolve(file_path);
		}, time);
		
	});
}


exports.process_message = async (message) => {
	let publisher = Publisher(config.RESPONSE_QUEUE_NAME);

	try{
		let link = message["link"];
		let ext = message["ext"];
		let time = pareInt(message["time"]);
		
		let file = await captureStream(link, time, ext);

		let file_url = `/static/${file}`;
		await publisher.sendMessage(JSON.stringify({
			action: "/record-stream",
			url: file_url,
			error: "",
			status: true
		}))
	} catch (e) {
		console.log(e);
		await publisher.sendMessage(JSON.stringify({
			action: "/record-stream",
			url: "",
			error: e,
			status: false
		}))
	}
}
