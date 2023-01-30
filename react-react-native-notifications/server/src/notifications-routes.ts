import WebPush from 'web-push';
import { FastifyInstance } from "fastify";
import { z } from 'zod';

const publicKey = "BMDhZBI15_Aa8UjjlMzK6iVr5a6IJdJqsfD9VCIVzfmDjjS3OyL1x6bMdUfRgPiyZmBFhCZKLuJwgh_NnocPXh4";
const privateKey = "4kWcAzgdZC5TvpBdr_8VmEozKWa5m8GYNSAlXEXqmq0";

WebPush.setVapidDetails(
	'http://localhost:3000',
	publicKey,
	privateKey
);

export async function notificationRoutes(app: FastifyInstance) {
	app.get('/push/public_key', () => {
		return {
			publicKey
		}
	});

	app.post('/push/register', (req, res) => {
		console.log(req.body);

		return res.status(201).send();
	});

	app.post('/push/send', async (req, res) => {
		const sendPushBody = z.object({
			subscription: z.object({
				endpoint: z.string(),
				keys: z.object({
					p256dh: z.string(),
					auth: z.string()
				})
			})
		});

		const { subscription } = sendPushBody.parse(req.body);

		WebPush.sendNotification(subscription, "Hello from Backend");
		
		return res.status(201).send();
	});
}