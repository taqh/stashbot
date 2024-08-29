import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import './bot';
import { sendNotification } from './notify';
import { postSchema, expectedDataShape } from './utils/validations';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Thanks for using Spade🤖');
});

app.get('/check', (c) => {
  return c.json({ status: 'ok' }, 200);
});

app.post('/notify', async (c) => {
  console.log('🤖 Received a server notification request');

  const blogPost = await c.req.json();
  const validatedData = postSchema.parse(blogPost);

  try {
    await sendNotification(validatedData);
    return c.json({ message: 'Notification sent successfully!' }, 200);
  } catch (error) {
    console.error('Error sending notification:', error);
    return c.json({ message: 'Error sending notification' }, 500);
  }
});

const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on ${port}`);

serve({
  fetch: app.fetch,
  port,
});
