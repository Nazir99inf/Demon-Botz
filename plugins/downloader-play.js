let search = require('yt-search');
let fetch = require('node-fetch');
 
let handler = async (m, { conn, text, usedPrefix }) => })
    if (!text) throw 'Enter Title / Link From YouTube!';
    try {
        m.reply("searching🔎. . . .");
        const look = await search(text);
        const convert = look.videos[0];
        if (!convert) throw 'Video/Audio Tidak Ditemukan';
        if (convert.seconds >= 3600) {
            return conn.reply(m.chat, 'Video is longer than 1 hour!', m);
        } else {
            let audioUrl;
            try {
                const res = await fetch(`https://api.betabotz.eu.org/api/download/yt?url=${convert.url}&apikey=${lann}`);
                try {
                    audioUrl = await res.json();
                } catch (e) {
                    conn.reply(m.chat, eror, m)
                }
                
            } catch (e) {
                conn.reply(m.chat, eror, m)
                return;
            }
 
            await conn.sendMessage(m.chat, {
                audio: {
                    url: audioUrl.result.mp3
                },
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: convert.title,
                        body: "Scaper : © Nazir⚡",
                        thumbnailUrl: convert.image,
                        sourceUrl: "https://wa.me/6285822146627?text=hallo+word",
                        mediaType: 0,
                        showAdAttribution: true,
                        renderLargerThumbnail: false
                    }
                }
            }, {
                quoted: null
            });
        }
    } catch (e) {
        conn.reply(m.chat, eror, m)
    }
};
 
handler.command = handler.help = ['play', 'song', 'ds'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
 
module.exports = handler;
