'use strict';

const Command = require('../structures/Command');
const { getCurrentQueue } = require('../utils/helpers/lavalink');

class Queue extends Command {
    constructor() {
        super();
        this.help = {
            name: 'queue',
            description: 'Shows the music queue.',
            category: 'Music',
            usage: 'queue',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let queue = getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (!client.player.get(message.guild.id)) { return message.channel.send("❌ The bot isn't connected to a voice channel."); }
        if (queue.length === 0) { return message.channel.send('❌ There are no songs in the queue.'); }
            let text = queue.slice(0, 15).map((song, i) => (i > 0 && i < 15 ? '[**' + i + '**] - **' + song.info.title + '**' + ' - added by **' + song.author + '**' : null)).join('\n');
            message.channel.send('**This is the queue:**\n\n' + (queue.length === 1 ? '**The queue is empty.**' : text + (queue.length > 15 ? '\n\nAnd more...' : '')) + '\n\nCurrently playing: **' + queue[0].info.title + '** - added by **' + queue[0].author + '**')
                .catch((err) => {
                    if (err) { return message.channel.send('❌ An error has occurred. Please try again later.\n```javascript\n' + err.message + '```'); }
                }); AAAAAAAAAAAAA
    }
}

module.exports = Queue;
