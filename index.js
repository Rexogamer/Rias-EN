'use strict';

const { Client, Collection } = require('discord.js');
const { PlayerManager } = require('discord.js-lavalink');
const fs = require('fs');

class Bot extends Client {
  constructor() {
    super();
    this.config = require('./config');
    this.commands = new Collection();
    this.aliases = new Collection();
    this.player = new PlayerManager(this, this.config.LAVALINK.NODES, {
      user: this.config.BOT.ID,
      shards: 0
    });
    this.logger = require('./src/utils/helpers/logger');
    this.launch();
  }

  launch() {
    this._loadCommands();
    this._loadEvents();
    this.login(this.config.BOT.TOKEN);
  }

  _loadCommands() {
    fs.readdir('./src/commands', (err, files) => {
      if (err) { return this.logger.error(`Problème | Une erreur est survenue:\n\n${err.message}`); }
      if (files.length < 0) { return this.logger.warn('Probleme | Aucune commande trouvée !'); }

        const commands = files.filter((c) => c.split('.').pop() === 'js');
        for (let i = 0; i < commands.length; i++) {
          if (!commands.length) { return this.logger.warn('Problème | Aucune commande trouvée !'); }
            const file = require(`./src/commands/${commands[i]}`);
            const command = new file(this);
              this.commands.set(command.help.name, command);
              this.logger.log(`Commande | ${command.help.name} chargée !`);

            if (command && command.help.aliases) {
              for (let i = 0; i < command.help.aliases.length; i++) { this.aliases.set(command.help.aliases[i], command); }
            }
        }
    });
  }

  _loadEvents() {
    fs.readdir('./src/events', (err, files) => {
      if (err) { return this.logger.error(`Une erreur est survenue:\n\n${err.message}`); }
      if (files.length < 0) { return this.logger.warn('Problème | Aucun event trouvé !'); }

        const events = files.filter((c) => c.split('.').pop() === 'js');
        for (let i = 0; i < events.length; i++) {
          if (!events.length) { return this.logger.warn('Problème | Aucun event trouvé !'); }
            const file = require(`./src/events/${events[i]}`);
            const event = new file(this);
              this.logger.log(`Event | ${event.name} chargé !`);
              this.on(events[i].split('.')[0], (...args) => event.run(this, ...args));
        }
    });
  }
}

module.exports.client = new Bot();
