module.exports = {
  help: ["commusism", "komunis"].map((a) => a + " *[reply/send media]*"),
  tags: ["maker"],
  command: ["communism", "komunis"],
  code: async (m, { conn, usedPrefix, command, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = q.mimetype;
    m.reply(wait);
    if (mime) {
      let url = await Uploader.catbox(await q.download());
      m.reply(done, `https://api.popcat.xyz/communism?image=${url}`);
    } else {
      let url = await Uploader.catbox(
        await Func.fetchBuffer(
          await conn.profilePictureUrl(q.sender, "image").catch((e) => icon),
        ),
      );
      m.reply(done, `https://api.popcat.xyz/communism?image=${url}`);
    }
  },
};
