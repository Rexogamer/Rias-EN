const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

// Lavalink function
module.exports.getSongs = (player, search) => {
    const node = player.nodes.first();
    const params = new URLSearchParams();

    params.append('identifier', search);

    return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } })
        .then((res) => res.json())
        .then((data) => data.tracks)
        .catch((err) => {
            console.error(err);
            return null;
        });
};

module.exports.getCurrentQueue = (queues, guildID) => {
    if (!queues[guildID]) { queues[guildID] = []; }
    return queues[guildID];
};

module.exports.play = async(client, message, args) => {
    let queue = this.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
    if (queue.length === 0) {
        await client.player.leave(message.guild.id);
        return message.channel.send('La file d\'attente est terminée. 👌');
    }
        const track = args;
        const [song] = await this.getSongs(client.player, `ytsearch: ${track}`);
        if (!song) { return message.channel.send('❌ Aucune musique de trouvé !'); }
            const player = await client.player.join({
                guild: message.guild.id,
                channel: message.member.voiceChannel.id,
                host: client.player.nodes.first().host
            }, { selfdeaf: true });

            if (!player) { return message.channel.send('❌ Le bot ne peut pas rejoindre ce salon.'); }
                player.play(song.track);
                player.on('error', (error) => {
                    if (error) { message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Ressayez plus tard.\n```JS\n' + error.message + '```'); }
                });
                player.on('end', async (data) => {
                    if (data.reason === 'REPLACED') { return; }
                    if (queue.length === 0 && data.reason === 'STOPPED') { return; }
                    else if (queue.length === 0) { return; }
                    else {
                        let nextSong = (queue.length > 1 ? queue[1].track : queue[0].track);
                        queue.shift();
                        this.play(client, message, nextSong);
                    }
                });
                return message.channel.send(`🎶 Nouvelle lecture: **${song.info.title}** par **${song.info.author}**. 🎶`);
};
