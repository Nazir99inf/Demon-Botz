let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[input text]*`;
  m.reply(wait);
  try {
    m.reply(
      done,
      `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${lolhuman}&text=${text}`,
    );
  } catch (e) {
    throw eror;
  }
};
handler.help = ["anonim"].map((a) => a + " *[input text*");
handler.tags = ["maker"];
handler.command = ["anonim"];

module.exports = handler;
