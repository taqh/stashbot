import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import OpenAI from 'openai';
import config from '../config';

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

export const command = {
  data: new SlashCommandBuilder()
    .setName('prompt')
    .setDescription('Get a response from AI')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Your prompt for the AI')
        .setRequired(true)
    ),

  execute: async (interaction: CommandInteraction) => {
    await interaction.deferReply({ ephemeral: true }); // discord requires a response within 3 seconds so we defer the reply to prevent a timeout as I cant predict openai's response time

    const promptOption = interaction.options.get('message');
    const prompt = promptOption?.value;

    if (!prompt || typeof prompt !== 'string') {
      await interaction.editReply('Please provide a message for the AI.');
      return;
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', 
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      });

      const aiResponse = response.choices[0].message.content;

      await interaction.editReply({
        content: `Your prompt: ${prompt}\n\nAI response: ${aiResponse}`,
      });
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      await interaction.editReply({
        content: 'Sorry, there was an error processing your request.',
      });
    }
  },
};
