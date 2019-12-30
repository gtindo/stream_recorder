const RabbitMqManager = require('./manager')

class Publisher extends RabbitMqManager{
	constructor(queueName){
		super();
		this.queue = queueName;
	}

	async sendMessage(message){
		try{
			const channel = await this.connection.createChannel();
			const queueListener = await channel.assertQueue(this.queue, {durable: false});
			await channel.sendToQueue(this.queue, Buffer.from(message));
			console.log(`[>] Message sent to ${this.queue} queue.`);
		}catch(err){
			console.log(err);
		}
	}
}

module.exports = Publisher