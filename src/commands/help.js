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
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    async run(client, message, _args) {
        let commands = client.commands.map((c) => '`' + c.help.name + '`' + ' - ' + c.help.description).join('\n');
        return message.channel.send('Voici la liste de mes commandes 😄\n\n' + commands);
    }
}

module.exports = Help;