const { createClient } = require('redis');
require('dotenv').config();

const redis = async () => {
	const client = createClient({
		url: process.env.REDIS_URL
	});

	client.on('error', (err) => console.log('Redis Client Error', err));
	client.on('ready', () => console.log('Redis Client ready'));

	await client.connect();

    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe('SOCKET_IO_EMITTER_KEY', (message) => {
        console.log(message); // 'message'
    });

    await subscriber.subscribe('chat:msg', (message) => {
        console.log(message); // 'message'
    });

    await subscriber.pSubscribe('SOCKET_IO_EMITTER_KEY', (message, channel) => {
        console.log(message, channel); // 'message', 'channel'
    });

    await subscriber.pSubscribe('chat:msg', (message, channel) => {
        console.log(message, channel); // 'message', 'channel'
    });

	await client.set('key', 'value');
	const value = await client.get('key');
};

module.exports = {
    redis
};

