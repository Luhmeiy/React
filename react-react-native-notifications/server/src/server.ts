import Fastify from 'fastify';
import cors from '@fastify/cors';
import { notificationRoutes } from './notifications-routes';

const app = Fastify();

app.register(cors);
app.register(notificationRoutes);

app.listen({
	host: '0.0.0.0',
	port: 3000
}).then(() => {
	console.log("HTTP Server running");
})