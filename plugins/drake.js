module.exports = {
  help: ["drake"].map((a) => a + " *[body|footer]*"),
  tags: ["maker"],
  command: ["drake"],
  code: async (
    m,
    {
      conn,
      usedPrefix,
      command,
      text,
      isOwner,
      isAdmin,
      isBotAdmin,
      isPrems,
      chatUpdate,
    },
  ) => {
    if (!text) throw `*• Example :* ${usedPrefix + command}  Sigma  | Ligma`;
    m.reply(wait);
    let pp = await conn.profilePictureUrl(m.sender, "image").catch((e) => icon);
    let [body, footer] = text.split("|");
    let url = await Uploader.catbox(await Func.fetchBuffer(pp));
    m.reply(done, `https://api.popcat.xyz/drake?text1=${body}&text2=${footer}`);
  },
};
