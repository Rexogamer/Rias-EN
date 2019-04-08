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
        if (!player) { return message.channel.send('❌ Le bot ne joue actuellement pas.'); }
        if (!player.playing) { return message.channel.send('❌ Le bot ne joue actuellement pas.'); }
            try {
                await player.pause(true);
                return message.channel.send('⏸ La musique est maintenant en pause.');
            } catch (exception) {
                if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
            }
    }
}

module.exports = Pause;
