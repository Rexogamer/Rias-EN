'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions = require('../utils/helpers/lavalink');

class Moveto extends Command {
    constructor() {
        super();
        this.help = {
            name: 'moveto',
            description: 'Faire rejoindre le bot dans un salon-vocal',
            category: 'Music',
            usage: 'moveto',
            aliases: []
        };
    }

    run(client, message, args) {
        const query = args.join(' ');
        const player = client.player.get(message.guild.id);
        let channel;
        if (!message.member || !message.member.voiceChannel) { return message.channel.send('❌ Vous devez être connecté dans un salon vocal pour faire cette commande.'); }
        if (!query) { return message.channel.send('❌ Vous devez spécifier un salon !'); }
        else {
            channel = message.guild.channels.filter((c) => c.type === 'voice').find((c) => c.name.toLowerCase() === query.toLowerCase() || c.id === query);
            if (!channel) { return message.channel.send('❌ Aucun salon trouvé !'); }
        }
        if (!player) { return message.channel.send('❌ Le bot n\'est actuellement pas connecté dans un salon vocal.'); }
            try {
                player.switchChannel(channel.id, true);
                return message.channel.send('Le bot a bien rejoint le salon **' + channel.toString() + '**. 👌');
            } catch (exception) {
                if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
            }
    }
}

module.exports = Moveto;
