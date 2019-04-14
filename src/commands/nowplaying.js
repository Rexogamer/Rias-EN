'use strict';

const Command = require('../structures/Command');
const LavalinkFunctions = require('../utils/helpers/lavalink');

const moment = require('moment');

class Nowplaying extends Command {
    constructor() {
        super();
        this.help = {
            name: 'nowplaying',
            description: 'Voir les informations de la musique en lecture',
            category: 'Music',
            usage: 'nowplaying',
            aliases: ['np']
        };
    }

    // eslint-disable-next-line no-unused-vars
    async run(client, message, _args) {
        let queue = LavalinkFunctions.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        const player = client.player.get(message.guild.id);
        if (!player) { return message.channel.send('❌ Le bot ne joue actuellement pas.'); }
        if (queue.length === 0) { return message.channel.send('❌ La queue est vide.'); }
        try {
            let duration = moment.duration({ ms: client.config.LAVALINK.QUEUES[message.guild.id][0].info.duration });
            let progression = moment.duration({ ms: client.player.get(message.guild.id).state.position * 1000 });
            let progressBar = ['▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬'];
            let calcul = Math.round(progress.length * ((progression / 1000 / 1000) / (duration / 1000)));
            progressBar[calcul] = '🔘';

            return message.channel.send({
                embed: {
                    title: '🎶 Lecture actuelle 🎶',
                    description: '[' + queue[0].info.title + '](' + queue[0].info.url + ')',
                    fields: [
                        {
                            name: 'Chaîne:',
                            value: queue[0].info.author,
                            inline: false
                        },
                        {
                            name: 'Durée:',
                            value: '[`' + moment(progression/1000).minutes() + ':' + moment(progression/1000).seconds() + '`] ' + progressBar.join("") +  ' [`' + duration.minutes() + ':' + duration.seconds() + '`]',
                            inline: false
                        }
                    ]
                }
            });
        } catch (exception) {
            if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
        }
    }
}

module.exports = Nowplaying;
