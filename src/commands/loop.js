'use strict';

const Command = require('../structures/Command');
const LavalinkFunctions = require('../utils/helpers/lavalink');

class Loop extends Command {
    constructor() {
        super();
        this.help = {
            name: 'loop',
            description: 'Repasser la lecture actuelle en boucle',
            category: 'Music',
            usage: 'loop',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    async run(client, message, _args) {
        let queue = LavalinkFunctions.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        const player = client.player.get(message.guild.id);
        if (!player) { return message.channel.send('❌ Le bot ne joue actuellement pas.'); }
        if (queue.length === 0) { return message.channel.send('❌ La queue est vide.'); }
            if (!queue[0].loop) {
                queue[0].loop = true;
                return message.channel.send('🔁 L\'option boucle est activée, le bot va répéter la musique indéfiniment.');
            } else {
                queue[0].loop = false;
                return message.channel.send('🔁 L\'option boucle est désactivée, le bot va poursuivre la file d\'attente.');
            }

    }
}

module.exports = Loop;
