'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions = require('../utils/helpers/lavalink');

class Join extends Command {
    constructor() {
        super();
        this.help = {
            name: 'join',
            description: 'Faire rejoindre le bot dans un salon-vocal',
            category: 'Music',
            usage: 'join',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    async run(client, message, _args) {
        if (!message.member || !message.member.voiceChannel) { return message.channel.send('❌ Vous devez être connecté dans un salon vocal pour faire cette commande.'); }
        try {
            await client.player.join({
                guild: message.guild.id,
                channel: message.member.voiceChannel.id,
                host: client.player.nodes.first().host
            }, { selfdeaf: true });
            return message.channel.send('Le bot a bien rejoint le salon **' + message.member.voiceChannel.toString() + '**. 👌');
        } catch (exception) {
            if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
        }
    }
}

module.exports = Join;
