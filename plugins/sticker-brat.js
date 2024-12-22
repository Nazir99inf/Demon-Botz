const axios = require('axios');
const fs = require('fs');

const handler = async (m, {
    conn,
    text,
    usedPrefix
}) => {
    if (!text) throw `Gunakan perintah ini dengan format: ${usedPrefix}brat <teks>`;

    try {
        conn.sendMessage(m.chat, {
            react: {
                text: '⏳',
                key: m.key
            }
        });

        const url = `https://siputzx-bart.hf.space/?q=${encodeURIComponent(text)}`;
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        const tempFilePath = `./temp_${new Date().getTime()}.jpg`;

        // Simpan gambar sementara
        fs.writeFileSync(tempFilePath, response.data);
 conn.sendMessage(m.chat, {
            react: {
                text: '🎉',
                key: m.key
            }
        });

        // Kirim sebagai stiker
        await conn.sendImageAsSticker(m.chat, tempFilePath, m, {
            packname: global.packname || 'Stiker By',
            author: global.author || 'Mahiru - MultiDevice',
        });

        // Hapus file sementara
        await fs.unlinkSync(tempFilePath);

    } catch (error) {
        console.error('Error:', error);
        await conn.reply(m.chat, 'Maaf, terjadi kesalahan saat mencoba membuat stiker brat. Coba lagi nanti.', m);
    }
};

handler.help = ['bratv1'].map((a) => a + " *[text]*");
handler.tags = ['sticker'];
handler.command = /^brat|bratv1$/i;
handler.limit = true;

module.exports = handler;
