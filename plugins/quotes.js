module.exports = {
  help: ["quotedmaker"].map((a) => a + " *[body|footer]*"),
  tags: ["maker"],
  command: ["quotedmaker"],
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
    let q = m.quoted ? m.quoted : m;
    if (!text) throw `*• Example :* ${usedPrefix + command} Kata kata hari ini`;
    m.reply(wait);
    let pp = await conn.profilePictureUrl(q.sender, "image").catch((e) => icon);
    let url = await Uploader.catbox(await Func.fetchBuffer(pp));
    m.reply(
      done,
      `https://api.popcat.xyz/quote?image=${url}&text=${text}&font=Poppins-Bold&name=${q.name}`,
    );
  },
};
