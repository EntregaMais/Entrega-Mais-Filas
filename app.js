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

    let open = amqp.connect('amqp://localhost:5672');

	// Publisher
	open.then(function(connection) {
		return connection.createChannel();
	})
	.then(function(channel) {
		//channel.assertExchange('CADASTRO', 'direct', { durable: true });
		return channel.assertQueue(queue).then(function(ok) {
				return channel.sendToQueue(queue, Buffer.from(JSON.stringify(request.body)));
		});
	}).catch(console.warn);
	

	response.json({message: "Sucesso"})
})



