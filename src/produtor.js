const express = require('express');
const app = express()

const amqp = require('amqplib/callback_api');


//forma de ler json
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
    amqp.connect(`amqp://ifpb:ifpb@localhost:5672`, (err, connection) => {
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
            // setTimeout(()=>{
            //     connection.close();
            // },1000)
        })
    })
    response.json({message: "Sucesso"})
})

//http://localhost:15672/