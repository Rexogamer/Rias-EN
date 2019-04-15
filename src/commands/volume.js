'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions = require('../utils/helpers/lavalink');

class Volume extends Command {
    constructor() {
        super();
        this.help = {
            name: 'volume',
            description: 'Ajuster le volume du stream',
            category: 'Music',
            usage: 'volume <volume>',
            aliases: []
        };
    }

    async run(client, message, args) {
        const volume = args.join(' ');
        const player = client.player.get(message.guild.id);
        if (!player) { return message.channel.send('❌ Le bot ne joue actuellement pas.'); }
        if (!volume || isNaN(volume)) { return message.channel.send('❌ Vous devez spécifier un nombre compris entre **1** et **100** pour ajuster le volume.'); }
        else if (volume <= 0 || volume > 100) { return message.channel.send('❌ Vous devez spécifier un nombre compris entre **1** et **100** pour ajuster le volume.'); }
            try {
                let vol = await player.volume(volume);
                let progressBar = ['▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬'];
                let calcul = Math.round(progressBar.length * (vol.state.volume / 100));
                progressBar[calcul] = '🔘';
                return message.channel.send('🔊 Le volume du stream est désormais à **' + vol.state.volume + '**%.\n[`' + vol.state.volume  + '%`] ' + progressBar.join('') + ' [`100%`]');
            } catch (exception) {
                if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
            }    
    }
}

module.exports = Volume;
