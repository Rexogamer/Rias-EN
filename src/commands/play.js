'use strict';

const Command = require('../structures/Command');
const { addToQueue } = require('../utils/helpers/lavalink');

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
        if (!message.member || !message.member.voiceChannel) { return message.channel.send('❌ Vous devez être connecté dans un salon vocal pour faire cette commande.'); }
            const player = client.player.get(message.guild.id);
            const track = args.join(' ');
            if (!player) { return message.channel.send('❌ Le bot doit être connecté dans un salon-vocal avant.'); }
            if (!track) { return message.channel.send('❌ Vous devez spécifier un nom de musique.'); }
                addToQueue(client, message, track);
    }
}

module.exports = Play;
