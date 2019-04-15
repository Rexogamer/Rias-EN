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

module.exports.play = async(client, message) => {
    try {
        let queue = this.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (queue.length === 0) {
            return client.player.leave(message.guild.id);
        }
            const player = client.player.get(message.guild.id);
            let currentTrack = queue[0];
            if (!player) { return message.channel.send('❌ Le bot n\'est pas connnecté.'); }
                message.channel.send(`🎶 Nouvelle lecture: **${currentTrack.info.title}** par **${currentTrack.info.author}**. 🎶`);

                player.play(currentTrack.track);
                player.once('error', (error) => {
                    if (error) { message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Ressayez plus tard.\n```JS\n' + error.message + '```'); }
                });
                player.once('end', (data) => {
                    if (data.reason === 'REPLACED') { return; }
                        if (!currentTrack.loop) { queue.shift(); }
                            if (data.reason === 'STOPPED' && queue.length === 0) { return message.channel.send('La file d\'attente est terminée. 👌'); }
                                this.play(client, message);
                });
    } catch (exception) {
        if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
    }
};

module.exports.addToQueue = async(client, message, track) => {
    try {
        let queue = this.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);

        if (track.startsWith('https://www.youtube.com/playlist?list=')) {
            const songs = await this.getSongs(client.player, `${track}`);
            if (!songs) { return message.channel.send('❌ Aucune musique de trouvé !'); }
                for (let i = 0; i < songs.length; i++) {
                    queue.push({
                        track: songs[i].track,
                        author: message.author.tag,
                        loop: false,
                        info: {
                            identifier: songs[i].info.identifier,
                            title: songs[i].info.title,
                            duration: songs[i].info.length,
                            author: songs[i].info.author,
                            url: songs[i].info.uri,
                            stream: songs[i].info.isStream,
                            seekable: songs[i].info.isSeekable
                        }
                    });
                }
                message.channel.send('☑ **' + songs.length + '** musique(s) ont/a été ajoutée(s) à la file d\'attente !');
        } else {
            const [song] = await this.getSongs(client.player, `ytsearch: ${track}`);
            if (!song) { return message.channel.send('❌ Aucune musique de trouvé !'); }
                queue.push({
                    track: song.track,
                    author: message.author.tag,
                    loop: false,
                    info: {
                        identifier: song.info.identifier,
                        title: song.info.title,
                        duration: song.info.length,
                        author: song.info.author,
                        url: song.info.uri,
                        stream: song.info.isStream,
                        seekable: song.info.isSeekable
                    }
                });
                if (queue.length > 1) { return message.channel.send('☑ **' + song.info.title + '** a été ajouté avec succès à la file d\'attente !'); }
        }
            return this.play(client, message);
    } catch (exception) {
        if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
    }
};
