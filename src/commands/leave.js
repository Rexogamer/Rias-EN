'use strict';

const Command = require('../structures/Command');
const { getCurrentQueue } = require('../utils/helpers/lavalink');

class Leave extends Command {
    constructor() {
        super();
        this.help = {
            name: 'leave',
            description: 'Disconnects the bot from a voice channel.',
            category: 'Music',
            usage: 'leave',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let queue = getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (!client.player.get(message.guild.id)) { return message.channel.send("❌ The bot isn't currently in a voice channel."); }
        if (queue.length > 0) { queue.splice(0, queue.length); }
            try {
                client.player.leave(message.guild.id);
                return message.channel.send('The bot has left the voice channel. 👌');
            } catch (exception) {
                if (exception) { return message.channel.send("❌ I'm sorry, but an error occurred.\n```JS\n" + exception.message + '```'); }
            }
    }
}

module.exports = Leave;
