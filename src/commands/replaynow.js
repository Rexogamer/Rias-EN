'use strict';

const Command = require('../structures/Command');
const { getCurrentQueue } = require('../utils/helpers/lavalink');

class Replaynow extends Command {
    constructor() {
        super();
        this.help = {
            name: 'replaynow',
            description: 'Re-mettre la lecture actuelle à 0',
            category: 'Music',
            usage: 'replaynow',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let queue = getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        const player = client.player.get(message.guild.id);
        if (!player) { return message.channel.send('❌ Le bot ne joue actuellement pas.'); }
        if (queue.length === 0) { return message.channel.send('❌ La file d\'attente est vide.'); }
            message.channel.send('⏮ Remise à 0...')
                .then((m) => {
                    m.delete();
                    try {
                        if (queue[0].loop) { player.stop(); }
                        else {
                            queue[0].loop = true;
                            player.stop();
                            setTimeout(() => {
                                queue[0].loop = false;
                            }, 1000);
                        }
                    } catch (exception) {
                        if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
                    }
                });
    }
}

module.exports = Replaynow;
