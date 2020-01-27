'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions = require('../utils/helpers/lavalink');

class Join extends Command {
    constructor() {
        super();
        this.help = {
            name: 'join',
            description: 'Adds the bot to a voice channel.',
            category: 'Music',
            usage: 'join [channel]',
            aliases: []
        };
    }

    run(client, message, args) {
        const query = args.join(' ');
        const player = client.player.get(message.guild.id);
        let channel;
        if (!message.member || !message.member.voiceChannel) { return message.channel.send('❌ You must be in a voice channel to use this command!'); }
        if (!message.member.voiceChannel && !query) { return message.channel.send('❌ You must specify a voice channel!'); }
        else if (query) {
            channel = message.guild.channels.filter((c) => c.type === 'voice').find((c) => c.name.toLowerCase() === query.toLowerCase() || c.id === query);
            if (!channel) { return message.channel.send('❌ No channel found!'); }
        }
        else if (message.member.voiceChannel) { channel = message.member.voiceChannel; }
        else { return message.channel.send('❌ No channel found!'); }
        if (player) { return message.channel.send('❌ The bot is already in a voice channel!'); }
            try {
                client.player.join({
                    guild: message.guild.id,
                    channel: channel.id,
                    host: client.player.nodes.first().host
                }, { selfdeaf: true });
                return message.channel.send('Joined the voice channel. **' + channel.toString() + '**. 👌');
            } catch (exception) {
                if (exception) { return message.channel.send("❌ I'm sorry, but an error occured.\n```JS\n" + exception.message + '```'); }
            }
    }
}

module.exports = Join;
