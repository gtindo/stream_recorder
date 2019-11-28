const fs = require("fs");
const request = require("request");
const express = require('express');
const configs = require('../../../config');


const router = express.Router()

router.get('/', (req, res) => {
	return res.json({message: `${configs.APP_NAME} ${configs.APP_VERSION}`});
});

router.get('/record/:duration', async (req, res) => {
	try{
		let link = "http://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3?origine=fluxradios";
		let time = parseInt(req.params.duration) * 1000;

		console.log(time);
		
		if(time > 0) await captureStream(link, time);
		return res.json({message: "End of stream"});
	} catch (e) {
		console.log(e);
		return res.json({message: "Something went wrong !!!"});
	}
});


let captureStream = async (link, time) => {
	return new Promise((resolve, reject) => {
		let req = request.get(link, (err, res) => {
			if(err) reject(err);
		}).pipe(fs.createWriteStream("sound_27.mp3"));

		setTimeout(() => {
			console.log("duration");
			req.destroy();
			resolve(true);
		}, time);
		
	});
}

module.exports = router