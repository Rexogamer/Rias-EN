'use strict';

const Command = require('../structures/Command');
// const LavalinkFunctions = require('../utils/helpers/lavalink');

class Help extends Command {
    constructor() {
        super();
        this.help = {
            name: 'help',
            description: "See a list of the bot's commands.",
            category: 'Bot',
            usage: 'help',
            aliases: ['h']
        };
    }
q
    // eslint-disable-next-line no-unused-vars
    run(client, message, _args) {
        let commands = client.commands.filter((c) => c.help.category !== 'Owner').map((c) => '**[' + c.help.name + '](https://discordapp.com/)**\n*' + c.help.description + '.*').join('\n');
        return message.channel.send('Here are my commands! :smile:', {
            embed: {
                author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL
                },
                description: commands,
                footer: {
                    text: 'by Sworder#0001 and Rexowogamer#1183'
                }
            }
        });
    }
}

module.exports = Help;
