const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { MessageCollector } = require('discord.js');

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

module.exports.play = (client, message) => {
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
            if (queue.length > songs.length) { return message.channel.send('☑ **' + songs.length + '** musique(s) ont/a été ajoutée(s) à la file d\'attente !'); }
            else { message.channel.send('☑ **' + songs.length + '** musique(s) ont/a été ajoutée(s) à la file d\'attente !'); }
                return this.play(client, message);
        } else {
            const songs = await this.getSongs(client.player, `ytsearch: ${track}`);
            if (!songs) { return message.channel.send('❌ Aucune musique de trouvé !'); }

            if (songs.length > 1) {
                let description = songs.slice(0, 5).map((s, i) => '[**' + (i+1) + '**] - [' + s.info.title + '](' + s.info.uri + ')').join('\n');
                message.channel.send('📖 Plusieurs musiques ont été trouvées, veuillez choisir une musique en tapant son identifiant.', {
                    embed: {
                        description,
                        footer: {
                            text: 'Tapez \'cancel\' pour annuler.'
                        }
                    }
                })
                .then((m) => {
                    const filter = (m) => m.author.id === message.author.id;
                    const collector = new MessageCollector(message.channel, filter, { time: 20000 });
                    collector.on('collect', (msgCollected) => {
                        if (
                        let choice = msgCollected.content.split(' ')[0];
                        if (choice.toLowerCase() === 'cancel') { return collector.stop('STOPPED'); }
                        if (!choice || isNaN(choice)) { return message.channel.send('❌ Ce choix n\'est pas valide.'); }
                        if (choice > songs.length || choice <= 0) { return message.channel.send('❌ Ce choix ne fait pas parti de la selection.'); }
                            let song = songs[(choice-1)];
                            collector.stop('PLAY');
                            m.delete();
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
                                return this.play(client, message);
                        });
                        collector.on('end', (collected, reason) => {
                            if (reason === 'STOPPED') { return message.channel.send('Cette opération a été annulée. 👌'); }
                            else if (reason === 'PLAY') { return; }
                            else { return message.channel.send('❌ Aucun choix n\'a été spécifié, cette opération a été annulée.'); }
                        });
                    })
                    .catch((err) => {
                        if (err) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + err.message + '```'); }
                    });
            } else {
                let song = songs[0];
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
                    return this.play(client, message);
            }
        }
    } catch (exception) {
        if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
    }
};
