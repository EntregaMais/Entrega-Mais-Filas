var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';

        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });
    });
});


// axios.post( 
// 	'http://192.168.1.5:8080/api/usuario/salvar',
// 	bodyParameters
// ).then(res => {
// 	console.log(res.data.status)
// 	console.log(res.data);
// })
// .catch((error) => {
// 	response.json({message: "Erro ao tentar cadastrar usuário"})
// })