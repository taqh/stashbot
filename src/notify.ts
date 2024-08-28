import { Client, TextChannel, GatewayIntentBits } from 'discord.js';
import { expectedDataShape } from './utils/validations';
import config from './config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(config.DISCORD_TOKEN);

const clientReady = new Promise<void>((resolve) => {
  client.once('ready', () => {
    console.log('Notification client is ready');
    resolve();
  });
});

export async function sendNotification(blogPost: expectedDataShape) {
  await clientReady;

  const channel = (await client.channels.fetch(
    config.NOTIFICATION_CHANNEL_ID
  )) as TextChannel;

  if (!channel) {
    console.error('Notification channel not found');
    return;
  }

  const message = `@everyone ${blogPost.author} Put up a new post titled: "${blogPost.title}", \n\n lets support them and Check it out \n\n link: ${blogPost.url} \n\n Cheers🥂`;

  try {
    await channel.send(message);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification to Discord:', error);
    throw new Error('Failed to send notification to Discord');
  }
}
