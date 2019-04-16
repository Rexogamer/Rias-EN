'use strict';

const Command = require('../structures/Command');
const { getCurrentQueue } = require('../utils/helpers/lavalink');

class Skip extends Command {
    constructor() {
        super();
        this.help = {
            name: 'skip',
            description: 'Passer à la prochaine musique de la file d\'attente',
            category: 'Music',
            usage: 'skip',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let queue = getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        const player = client.player.get(message.guild.id);
        if (!player) { return message.channel.send('❌ Le bot n\'est actuellement pas connecté dans un salon vocal.'); }
            message.channel.send('⏩ Passage en cours...')
                .then((m) => {
                    m.delete();
                    try {
                        player.stop();
                    } catch (exception) {
                        if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
                    }
                });
    }
}

module.exports = Skip;
