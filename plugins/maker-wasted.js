let fetch = require("node-fetch");

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
  m.reply(wait);
  let media = await q.download();
  let url = await Uploader.Uguu(media);
  let hasil = await (
    await fetch(
      `https://api.lolhuman.xyz/api/editor/wasted?apikey=${lolhuman}&img=${url}`,
    )
  ).buffer();
  await conn.sendFile(m.chat, hasil, "", done, m);
};
handler.help = ["wasted"].map((a) => a + " *[reply/send media]*");
handler.tags = ["maker"];
handler.command = ["wasted"];
handler.limit = true;

module.exports = handler;
