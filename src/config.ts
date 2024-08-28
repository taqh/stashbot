import dotenv from "dotenv"

dotenv.config()

const { APPLICATION_ID, PUBLIC_KEY, DISCORD_TOKEN, GUILD_ID, NOTIFICATION_CHANNEL_ID, OPENAI_API_KEY } = process.env

if (!APPLICATION_ID || !PUBLIC_KEY || !DISCORD_TOKEN || !GUILD_ID || !NOTIFICATION_CHANNEL_ID || !OPENAI_API_KEY) {
  throw new Error("Missing environment variables")
}

const config: Record<string, string> = {
   APPLICATION_ID,
   PUBLIC_KEY,
   DISCORD_TOKEN,
   GUILD_ID,
   NOTIFICATION_CHANNEL_ID,
   OPENAI_API_KEY
}

export default config