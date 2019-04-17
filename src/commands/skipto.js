'use strict';

const Command = require('../structures/Command');
const { getCurrentQueue } = require('../utils/helpers/lavalink');

class Skipto extends Command {
    constructor() {
        super();
        this.help = {
            name: 'skipto',
            description: 'Passer à une musique choisie dans la file d\'attente',
            category: 'Music',
            usage: 'skipto <identifiant>',
            aliases: []
        };
    }

    run(client, message, args) {
        const choice = args.join(' ');
        const player = client.player.get(message.guild.id);
        let queue = getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (!choice || isNaN(choice)) { return message.channel.send('❌ Vous devez spécifier le nombre de la musique du classement de la file d\'attente.'); }
        else if (choice <= 0 || choice > queue.length) { return message.channel.send('❌ Aucune musique ne possède cet identifiant dans la file d\'attente.'); }
        if (!player) { return message.channel.send('❌ Le bot n\'est actuellement pas connecté dans un salon vocal.'); }
            message.channel.send('⏩ Passage en cours...')
                .then((m) => {
                    m.delete();
                    try {
                        queue.splice(0, (choice-1));
                        return player.stop();
                    } catch (exception) {
                        if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
                    }
                });
    }
}

module.exports = Skipto;
