'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions = require('../utils/helpers/lavalink');

class Pause extends Command {
    constructor() {
        super();
        this.help = {
            name: 'pause',
            description: 'Mettre le stream en pause',
            category: 'Music',
            usage: 'pause',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    async run(client, message, _args) {
        const player = client.player.get(message.guild.id);
        if (!player) { return message.channel.send('❌  Le bot ne joue actuellement pas.'); }
        if (!player.playing) { return message.channel.send('❌  Le bot ne joue actuellement pas.'); }
            await player.pause(true);
            return message.channel.send('⏸ La musique est en pause.');
    }
}

module.exports = Pause;