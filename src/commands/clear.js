'use strict';

const Command = require('../structures/Command');
const { getCurrentQueue } = require('../utils/helpers/lavalink');

class Clear extends Command {
    constructor() {
        super();
        this.help = {
            name: 'clear',
            description: 'Clears the music queue.',
            category: 'Music',
            usage: 'clear',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let queue = getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (!client.player.get(message.guild.id)){ return message.channel.send("❌ The bot isn't connected to a voice channel."); }
        if (queue.length === 0) { return message.channel.send("⚠ The queue is empty."); }
        else if (queue.length !== 1) { queue.splice(1, queue.length); }
            message.channel.send('✅ The queue has been cleared.');
    }
}

module.exports = Clear;
