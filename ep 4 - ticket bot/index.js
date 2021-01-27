const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const enmap = require('enmap');
const {token, prefix} = require('./config.json');

const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});

client.on('ready', () => {
    console.log('ready')
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "ticket-setup") {
        // ticket-setup #channel

        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Usage: `!ticket-setup #channel`");

        let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Ticket System")
            .setDescription("React to open a ticket!")
            .setFooter("Ticket System")
            .setColor("00ff00"));
        sent.react('🎫');
        message.channel.send("Ticket System Setup Done!")
    }

    if(command == "close") {
        if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        message.channel.delete();
    }
});
//Hi! I'm Frosty, I took the time to edit the code since there were things that were wrong.
// DISCORD = FROSTY#0002
client.on('messageReactionAdd', async (reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === 'EMBED, MESSAGE ID')

    if(reaction.emoji.name === 'EMOJI') {
        reaction.users.remove(user);

        reaction.message.guild.channels.create(`ticket-${user.username}`, {
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text'
        }).then(async channel => {
            channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00"))
        })
    }
});

client.login(token);
