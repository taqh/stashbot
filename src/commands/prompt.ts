import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import config from '../config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(config.GOOGLE_API_KEY);
const MAX_MESSAGE_LENGTH = 1900;

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
      // GEMINI
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

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
