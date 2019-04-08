'use strict';

const Command = require('../structures/Command');

class Invite extends Command {
  constructor() {
    super();
    this.help = {
      name: 'invite',
      description: 'Envoie l\'invitation du bot',
      category: 'Bot',
      usage: 'invite',
      aliases: []
    };
  }

  // eslint-disable-next-line no-unused-vars
  run(client, message, _args) {
    message.channel.send(`🔗 Voici mon lien d\'invitation: <https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=36719872>`);
  }
}

module.exports = Invite;
