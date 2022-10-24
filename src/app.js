const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express()

//forma d eler json
app.use(
	express.urlencoded({
		extended: true
	}),
)

app.use(express.json())

// Expor a porta
app.listen(3000)

// rota inicial / endpoint
app.get("/", (request, response) => {
	let queue = 'FILA_CADASTRO_USUARIO';

	amqp.connect('amqp://ifpb:ifpb@localhost:5672', function(error0, connection) {
		if (error0) {
			throw error0;
		}
		connection.createChannel(function(error1, channel) {
			if (error1) {
				throw error1;
			}
			var exchange = 'CADASTRO';
			var msg = 'Hello World!';
	
			// channel.assertExchange(exchange, 'direct', {
			// 	durable: false
			// });
			channel.assertQueue(queue); // asserts the queue exists
			channel.sendToQueue(queue, Buffer.from('something to do')); // sends a message to the queue

			// channel.publish(exchange, '', Buffer.from(msg));
			console.log(" [x] Sent %s", msg);
		});
	
		// setTimeout(function() {
		// 	connection.close();
		// 	process.exit(0);
		// }, 500);
	});
	

	response.json({message: "Sucesso"})
})



