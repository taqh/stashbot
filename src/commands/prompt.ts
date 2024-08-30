import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import config from '../config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// GEMINI
const genAI = new GoogleGenerativeAI(config.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',  
  generationConfig: {
    maxOutputTokens: 800, 
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
  }, 
  systemInstruction: "You are a helpful assistant that provides concise and accurate information. Keep responses under 2000 characters."
});


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
    await interaction.deferReply({ ephemeral: true }); // discord requires a response within 3 seconds so we defer the reply to prevent a timeout as I cant predict GEMINI's response time

    const promptOption = interaction.options.get('message');
    const prompt = promptOption?.value;

    if (!prompt || typeof prompt !== 'string') {
      await interaction.editReply('Please provide a message for the AI.');
      return;
    }

    try {
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      await interaction.editReply({
        content: `**Your prompt:** ${prompt}\n\n**AI response:** ${aiResponse}`,
      });
    } catch (error) {
      console.error('Error with Gemini API:', error);
      await interaction.editReply({
        content: 'Sorry, there was an error processing your request.',
      });
    }
  },
};
