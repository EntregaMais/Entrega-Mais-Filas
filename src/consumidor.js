const amqp = require('amqplib/callback_api');
const axios = require("axios");


console.log("Consumidor Online")
amqp.connect(`amqp://ifpb:ifpb@host.docker.internal:5672`, (err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err, channel)=> {
        if(err){
            throw err;
        }
        let queueName = "FILA_CADASTRO_USUARIO";

        channel.assertQueue(queueName, {
                durable:false
        });
        channel.consume(queueName, (msg) => {
			console.log(msg.content.toString());
			axios.post('http://host.docker.internal:8080/api/usuario/salvar', msg.content.toString(), {
				headers: {
					'Content-Type': 'application/json'
				}})
			.then(res => {
				const outcome = (res.data.status) ? "Erro" : "Sucesso";
			})
			.catch((error) => {
				console.log(error);
		});
            //channel.ack(msg);
        }, {
            noAck: true
        });
    })

})