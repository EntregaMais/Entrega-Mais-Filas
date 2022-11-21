// Env config
const config =  require('../config');
console.log(`NODE_ENV=${config.NODE_ENV}`);

// amqplib
const amqp = require('amqplib/callback_api');
const axios = require("axios");


console.log("Consumidor Online")
amqp.connect(`amqp://ifpb:ifpb@`+config.HOST+`:`+config.PORT_RABBITMQ, (err, connection) => {
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
			axios.post('http://'+config.HOST+`:`+config.PORT_APP+'/api/usuario/salvar', msg.content.toString(), {
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