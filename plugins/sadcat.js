module.exports = {
  help: ["sadcat"].map((a) => a + " *[input text]*"),
  tags: ["maker"],
  command: ["sadcat"],
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
    if (!text) throw `*• Example :* ${usedPrefix + command} *[input text]*`;
    m.reply(wait);
    let pp = await conn.profilePictureUrl(m.sender, "image").catch((e) => icon);
    let [body, footer] = text.split("|");
    let url = await Uploader.catbox(await Func.fetchBuffer(pp));
    m.reply(done, `https://api.popcat.xyz/sadcat?text=${text}`);
  },
};
