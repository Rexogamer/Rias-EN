const Event = require('../structures/Event');
const logo = require('asciiart-logo');

module.exports = class Ready extends Event {
  constructor() { super({ name: 'ready' }); }

  async run(client) {
    if(!client.user.bot) { return process.exit(0); }
    client.user.setPresence({ game: { name: `${client.config.BOT.PREFIX}help pour voir mes commandes !` } });


    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(
      logo({
        name: 'LAVALINK-BOT',
        font: 'Speed',
        lineChars: 15,
        padding: 5,
        margin: 2
      })
      .emptyLine()
      .right(`version ${require('../../package').version}`)
      .emptyLine()
      .wrap(`${client.user.username}#${client.user.discriminator} développé par Sworder.`)
      .render()
    );
  }
};