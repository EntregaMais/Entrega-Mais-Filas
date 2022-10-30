const amqp = require('amqplib/callback_api');

var express = require('express');
var router = express();
var bodyParser = require('body-parser');

//forma de ler json no method POST
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())

// Expor a porta
router.listen(3000)


console.log("Produtor Online")
router.post('/', (request, response) => {
    console.log('receiving data ...');
    console.log('body is ', request.body);
    //res.send(req.body);
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
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(request.body)));
            console.log(JSON.stringify(request.body));
            // setTimeout(()=>{
            //     connection.close();
            // },1000)
        })
    })
    response.json({message: "Requisição de Cadastro feita com Sucesso"})
});
