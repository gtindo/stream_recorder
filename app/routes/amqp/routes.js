const handlers = require('../../handlers/handlers')

const actions = [
	{route: "/record-stream", handler: handlers.process_message}
]

module.exports = actions