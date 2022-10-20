const amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost:5672`, (err, connection) => {
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
            console.log(`Recebido : ${msg.content.toString()}`);
            //channel.ack(msg);
        }, {
            noAck: true
        });
    })

})