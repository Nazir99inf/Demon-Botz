let search = require('yt-search');
let fetch = require('node-fetch');
 

let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw 'ketik apa Yang Mau Di Cari';
    try {
        conn.sendMessage(m.chat, {
            react: {
                text: '🔎',
                key: m.key
            }
        });
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
let caption = '';
            caption += `∘ Title : ${convert.title}\n`;
            caption += `∘ Duration : ${convert.timestamp}\n`;
            caption += `∘ Viewers : ${convert.views}\n`;
            caption += `∘ Upload At : ${convert.ago}\n`;
            caption += `∘ Author : ${convert.author.name}\n`;
            caption += `∘ Url : ${convert.url}\n`;
            caption += `∘ Thumbnail : ${convert.image}\n`;
             caption += `∘ Credit : © Nazir ⚡\n`;
            caption += `*(Please Wait) Upload / Send Audio ⌛*`;
 
            conn.relayMessage(m.chat, {
                extendedTextMessage: {
                    text: caption,
                    contextInfo: {
                        externalAdReply: {
                            title: convert.title,
                            body: "Lagu-Nazir.....🥀☹️",
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnailUrl: convert.image
                        }
                    },
                    mentions: [m.sender]
                }
            }, {});

             conn.sendMessage(m.chat, {
            react: {
                text: '🎶',
                key: m.key
            }
        });

            conn.sendMessage(m.chat, {
                audio: {
                    url: audioUrl.result.mp3
                },
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: convert.title,
                        body: "© Nazir Mode Sad🥀🎶",
                        thumbnailUrl: convert.image,
                        sourceUrl: "",
                        mediaType: 0,
                        ptt: true,
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
