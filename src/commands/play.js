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
            if (!track) { return message.channel.send('❌ Vous devez spécifier un nom de musique.'); }
            if (!player) {
                client.player.join({
                    guild: message.guild.id,
                    channel: message.member.voiceChannel.id,
                    host: client.player.nodes.first().host
                }, { selfdeaf: true });
            }
                addToQueue(client, message, track);
    }
}

module.exports = Play;
