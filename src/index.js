require("dotenv").config();
require("./server.js");
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// =====================
// Commands
// =====================
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");

for (const file of fs.readdirSync(commandsPath)) {
  if (!file.endsWith(".js")) continue;
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// =====================
// Events
// =====================
const eventsPath = path.join(__dirname, "events");
for (const file of fs.readdirSync(eventsPath)) {
  if (!file.endsWith(".js")) continue;
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.DISCORD_TOKEN);
