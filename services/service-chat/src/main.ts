import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import * as dotenv from 'dotenv';
import { handleConnect, handleMessage } from './runtime/runtime';
dotenv.config();

const fastify = Fastify({
    logger: true
});
fastify.register(fastifyWebsocket);

fastify.register(async function (fastify) {
    fastify.get('/', { websocket: true }, async function wsHandler (connection, _) {
        /*// bound to fastify server
        this.myDecoration.someFunc()*/
        await handleConnect(connection);
        
        connection.socket.on('message', async (message) => {
            // message.toString() === 'hi from client'
            await handleMessage(connection, JSON.parse(message.toString()));
        })
    })
});

fastify.listen({ host: "0.0.0.0", port: 4040 }, () => {
    
});