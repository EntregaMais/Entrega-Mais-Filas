// Env config
const config =  require('../config');
console.log(`NODE_ENV=${config.NODE_ENV}`);

// amqplib
const amqp = require('amqplib/callback_api');

// Express
var express = require('express');
var router = express();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())
router.listen(3000) // Expor Porta


console.log("Produtor Online")
router.post('/', (request, response) => {
    console.log('Recebendo Requisição ...');
    console.log('Corpo da Requisição: ', request.body);
    //res.send(req.body);
    amqp.connect(`amqp://ifpb:ifpb@`+config.HOST+`:`+config.PORT, (err, connection) => {
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
