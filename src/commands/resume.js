'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions = require('../utils/helpers/lavalink');

class Resume extends Command {
    constructor() {
        super();
        this.help = {
            name: 'resume',
            description: 'Re-mettre le stream en mode play',
            category: 'Music',
            usage: 'resume',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    async run(client, message, _args) {
        const player = client.player.get(message.guild.id);
        if (!player) { return message.channel.send('❌  Le bot ne joue actuellement pas.'); }
        if (player.playing) { return message.channel.send('❌  Le bot joue déjà.'); }
        await player.pause(false);
        return message.channel.send('⏸ La musique est de nouveau en mode play.');
    }
}

module.exports = Resume;