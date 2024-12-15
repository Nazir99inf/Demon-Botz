let axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`;    
    try {
        if (!text.match(/tiktok/gi) && !text.match(/douyin/gi)) {
          throw `URL Tidak Ditemukan!`;
        }
        m.reply(wait);      

        try {
            const response = await axios.get(`https://api.siputzx.my.id/api/tiktok?url=${text}`);
            const res = response.data.result;      
            var { video, title, title_audio, audio } = res;
            if (!video[0]) {
                throw eror
            }
            let capt = `乂 *T I K T O K   D O W N L O A D E R*\n\n`;
            capt += `◦ *Title* : ${title}\n`;
            capt += `\n`;   
                 
            if (video.length > 1) {
                for (let v of video) {
                    conn.sendFile(m.chat, v, null, capt, m);
                }
            } else {
                conn.sendFile(m.chat, video[0], null, capt, m);
            }

            if (!audio[0]) {
                conn.reply(m.chat, "_Audio tidak tersedia!_", m);
            } else {
                conn.sendMessage(m.chat, { audio: { url: audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });
            }
            return;
        } catch (e) {
            throw eror;
        }
    } catch (e) {
        throw eror;
    }
};

handler.help = ['tiktok'];
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i;
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

module.exports = handler;
