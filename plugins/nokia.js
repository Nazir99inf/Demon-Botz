//© AkiraaBot 2023-2024
// • Credits : wa.me/6287869975929 [ Bang syaii ]
// • Owner: 6287869975929,6283831945469

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

module.exports = {
  help: ["nokia"].map((a) => a + " *[reply/send media]*"),
  tags: ["maker"],
  command: ["nokia"],
  code: async (m, { conn, usedPrefix, command, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = q.mimetype;
    m.reply(wait);
    if (mime) {
      let url = await Uploader.catbox(await q.download());
      conn.sendImageAsSticker(
        m.chat,
        `https://api.popcat.xyz/nokia?image=${url}`,
        m,
        {
          packname: packname,
          author: author,
        },
      );
    } else {
      let url = await Uploader.catbox(
        await Func.fetchBuffer(
          await conn.profilePictureUrl(q.sender, "image").catch((e) => icon),
        ),
      );
      conn.sendImageAsSticker(
        m.chat,
        `https://api.popcat.xyz/nokia?image=${url}`,
        m,
        {
          packname: packname,
          author: author,
        },
      );
    }
  },
};
