module.exports = {
  help: ["pooh"].map((a) => a + " *[body|footer]*"),
  tags: ["maker"],
  command: ["pooh"],
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
    if (!text)
      throw `*• Example :* ${usedPrefix + command} Action, isekai, harem, ecchi | slice of life`;
    m.reply(wait);
    let pp = await conn.profilePictureUrl(m.sender, "image").catch((e) => icon);
    let [body, footer] = text.split("|");
    let url = await Uploader.catbox(await Func.fetchBuffer(pp));
    m.reply(done, `https://api.popcat.xyz/pooh?text1=${body}&text2=${footer}`);
  },
};
