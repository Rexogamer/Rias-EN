'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions = require('../utils/helpers/lavalink');

class Help extends Command {
    constructor() {
        super();
        this.help = {
            name: 'help',
            description: 'Voir la liste des commandes du bot',
            category: 'Bot',
            usage: 'help',
            aliases: ['h']
        };
    }

    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let commands = client.commands.filter((c) => c.help.category !== 'Owner').map((c) => '**[' + c.help.name + '](https://discordapp.com/)**\n*' + c.help.description + '.*').join('\n');
        return message.channel.send('Voici la liste de mes commandes :smile:', {
            embed: {
                author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL
                },
                description: commands,
                footer: {
                    text: 'par Sworder#0001'
                }
            }
        });
    }
}

module.exports = Help;
