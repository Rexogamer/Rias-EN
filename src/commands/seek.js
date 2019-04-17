'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions  = require('../utils/helpers/lavalink');

const moment = require('moment');

class Seek extends Command {
    constructor() {
        super();
        this.help = {
            name: 'seek',
            description: 'Ajuster la position du stream',
            category: 'Music',
            usage: 'seek <position du stream en seconde>',
            aliases: []
        };
    }

    run(client, message, args) {
        const query = args.join(' ');
        const player = client.player.get(message.guild.id);
        let time = client.config.LAVALINK.QUEUES[message.guild.id][0].info.duration;
        if (!player || !player.playing) { return message.channel.send('❌ Le bot ne joue actuellement pas.'); }
        if (!query || isNaN(query)) { return message.channel.send('❌ Vous devez spécifier un nombre compris entre **1** et **' + (time / 1000) + '** pour modifier la position.'); }
        else if (query <= 0 || query > (time / 1000)) { return message.channel.send('❌ Vous devez spécifier un nombre compris entre **1** et **' + (time / 1000) + '** pour ajuster la position.'); }
            try {
                let seek = player.seek((query * 1000));
                let duration = moment.duration({ ms: time });
                let progression = moment.duration({ ms: ((query * 1000) * 1000) });
                return message.channel.send('⏩ La position est désormais à [`' + moment(progression/1000).minutes() + ':' + moment(progression/1000).seconds() + '`]/[`' + duration.minutes() + ':' + duration.seconds() + '`]');
            } catch (exception) {
                if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
            }
    }
}

module.exports = Seek;
