//const express = require('express');
//const app = express()

const amqp = require('amqplib/callback_api');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


//forma de ler json
        // Expor a porta
app.listen(3000)

app.post('/', (request, response) => {
    console.log('receiving data ...');
    console.log('body is ',request.body);
    //res.send(req.body);
    amqp.connect(`amqp://ifpb:ifpb@localhost:5677`, (err, connection) => {
            if(err){
            throw err;
        }
        connection.createChannel((err, channel)=> {
            if(err){
                throw err;
            }
            let queueName = "FILA_CADASTRO_USUARIO";
            let message = "Socoro";
            channel.assertQueue(queueName, {
                    durable:false
            });
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(request.body)));
            console.log(`Message : ${message}`);
            console.log(JSON.stringify(request.body));
            // setTimeout(()=>{
            //     connection.close();
            // },1000)
        })
    })
    response.json({message: "Sucesso"})
});

        
    // rota inicial / endpoint
    app.get("/", (request, response) => {
        amqp.connect(`amqp://ifpb:ifpb@localhost:5677`, (err, connection) => {
            if(err){
            throw err;
        }
        connection.createChannel((err, channel)=> {
            if(err){
                throw err;
            }
            let queueName = "FILA_CADASTRO_USUARIO";
            let message = "Socoro";
            channel.assertQueue(queueName, {
                    durable:false
            });
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(request.body)));
            console.log(`Message : ${message}`);
            console.log(JSON.stringify(request.body));
            // setTimeout(()=>{
            //     connection.close();
            // },1000)
        })
    })
    response.json({message: "Sucesso"})
})

//http://localhost:15672/