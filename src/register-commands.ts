import { REST, Routes } from 'discord.js';
import config from './config';
import { commands } from './commands';

const commandsData = commands.map(command => command.data.toJSON());
console.log('Command data:', JSON.stringify(commands, null, 2));

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

async function registerCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(config.APPLICATION_ID), {
      body: commandsData,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.log('Failed to register commands.');
    console.error(error);
  }
}

registerCommands();