'use strict';

const Event = require('../structures/Event');

module.exports = class message extends Event {
    constructor() { super({ name: 'message' }); }

    run(client, message) {
        if (!message.guild || message.author.bot) { return; }
        if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) { return; }

        let command = message.content.slice(1).trim().split(' ').shift().toLowerCase();
        let args = message.content.split(' ').slice(1);

        if (!message.content.startsWith(client.config.BOT.PREFIX)) { return; }
        if (client.commands.has(command)) {
            const cmd = client.commands.get(command);
            if (cmd.category === 'Owner' && message.author.id !== client.config.BOT.OWNER_ID) { return; }
                cmd.run(client, message, args);
        } else if (client.aliases.has(command)) {
            const cmd = client.aliases.get(command);
                cmd.run(client, message, args);
        }
    }
};