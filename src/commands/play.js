'use strict';

const Command = require('../structures/Command');
const LavalinkFunctions = require('../utils/helpers/lavalink');

class Play extends Command {
    constructor() {
        super();
        this.help = {
            name: 'play',
            description: 'Jouer un stream',
            category: 'Music',
            usage: 'play <nom de musique>',
            aliases: []
        };
    }

    run(client, message, args) {
        let queue = LavalinkFunctions.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (!message.member || !message.member.voiceChannel) { return message.channel.send('❌ Vous devez être connecté dans un salon vocal pour faire cette commande.'); }
            const track = args.join(' ');
            if (queue.length > 0) {
                queue.push({ track, author: message.author.tag });
                message.channel.send('☑ **' + track + '** à été ajouté avec succès à la queue !');
            } else {
                queue.push({ track, author: message.author.tag });
                LavalinkFunctions.play(client, message, track);
            }

    }
}

module.exports = Play;
