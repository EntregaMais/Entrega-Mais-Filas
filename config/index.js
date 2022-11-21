const dotenv = require('dotenv');
const path = require('path');

 dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'local',
    HOST: process.env.HOST || 'localhost',
    PORT_RABBITMQ: process.env.PORT_RABBITMQ || '5672',
	PORT_APP: process.env.PORT_APP || '7720'
}
