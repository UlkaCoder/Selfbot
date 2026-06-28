const { Client } = require('discord.js-selfbot-v13');
const express = require('express');
const app = express();

const TOKEN = process.env.DISCORD_TOKEN;
const VOICE_CHANNEL_ID = "1519178748539310222";
const GUILD_ID = "1494068874600255528";

if (!TOKEN) {
    console.error("❌ DISCORD_TOKEN environment variable is not set. Exiting.");
    process.exit(1);
}

const client = new Client();

app.get('/', (req, res) => res.send('OK'));

client.on('ready', async () => {
    console.log(`✅ ${client.user.tag} conectado`);
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);
        await channel.join({ selfDeaf: true, selfMute: false });
        console.log(`🔊 Conectado a: ${channel.name}`);
    } catch(e) {
        console.error(e);
    }
});

client.on('voiceStateUpdate', async (old, now) => {
    if (old.member?.id === client.user?.id && !now.channelId) {
        const guild = client.guilds.cache.get(GUILD_ID);
        const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);
        await channel.join({ selfDeaf: true, selfMute: false });
        console.log('🔄 Reconectado');
    }
});

app.listen(3000);
client.login(TOKEN);
