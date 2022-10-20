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

// amqp.connect('amqp://localhost:5672', function(error0, connection) {
// 	if (error0) {
// 	  throw error0;
// 	}
// 	connection.createChannel(function(error1, channel) {
// 	  if (error1) {
// 		throw error1;
// 	  }
// 	  var exchange = 'FILA_CADASTRO_USUARIO';
// 	  var msg = process.argv.slice(2).join(' ') || 'Hello World!';
  
// 	  channel.assertExchange(exchange, 'fanout', {
// 		durable: false
// 	  });
// 	  channel.publish(exchange, '', Buffer.from(msg));
// 	  console.log(" [x] Sent %s", msg);
// 	});
  
// 	setTimeout(function() {
// 	  connection.close();
// 	  process.exit(0);
// 	}, 500);
//   });