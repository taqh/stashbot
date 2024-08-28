import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const command = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Creates a help ticket'),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply('Feature is in development!!');
  },
};
