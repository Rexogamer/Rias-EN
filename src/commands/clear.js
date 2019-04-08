'use strict';

const Command = require('../structures/Command');
const LavalinkFunctions = require('../utils/helpers/lavalink');

class Clear extends Command {
    constructor() {
        super();
        this.help = {
            name: 'clear',
            description: 'Vider la liste des musiques en attente',
            category: 'Music',
            usage: 'clear',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let queue = LavalinkFunctions.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (!client.player.get(message.guild.id)) { return message.channel.send('❌ Le bot n\'est actuellement pas connecté dans un salon vocal.'); }
        if (queue.length === 0) { return message.channel.send('⚠ The queue is empty.'); }
        else if (queue.length !== 1) { queue.splice(1, queue.length); }
            message.channel.send('✅ La file d\'attente a bien été supprimée.');
    }
}

module.exports = Clear;
