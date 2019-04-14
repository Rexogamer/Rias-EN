'use strict';

const Command = require('../structures/Command');
const LavalinkFunctions = require('../utils/helpers/lavalink');

class Queue extends Command {
    constructor() {
        super();
        this.help = {
            name: 'queue',
            description: 'Voir la liste des musiques en attente',
            category: 'Music',
            usage: 'queue',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let queue = LavalinkFunctions.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (!client.player.get(message.guild.id)) { return message.channel.send('❌ Le bot n\'est actuellement pas connecté dans un salon vocal.'); }
        if (queue.length === 0) { return message.channel.send('❌ La queue est vide.'); }
            let text = queue.slice(0, 15).map((song, i) => '[**' + (i+1) + '**] - **' + song.info.title + '**' + ' - Ajouté par **' + song.author + '**').join('\n');
            message.channel.send('Voici la liste des musiques en attente du serveur:\n\n' + (queue.length === 1 ? '**La queue est vide !**' : text + (queue.length > 15 ? '\n\nEt plus encore...' : '')) + '\n\nLecture actuelle: **' + queue[0].info.title + '** - Ajoutée par **' + queue[0].author + '**')
                .catch((err) => {
                    if (err) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + err.message + '```'); }
                });
    }
}

module.exports = Queue;
