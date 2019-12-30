const fs = require("fs");
const request = require("request");
const express = require('express');
const configs = require('../../../config');


const router = express.Router()

router.get('/', (req, res) => {
	return res.json({message: `${configs.APP_NAME} ${configs.APP_VERSION}`});
});

module.exports = router