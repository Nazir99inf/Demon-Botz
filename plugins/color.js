module.exports = {
  help: ["color"].map((a) => a + " *[hex color]*"),
  tags: ["maker"],
  command: ["color"],
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
    if (!text) throw `*• Example :* ${usedPrefix + command} *[hex color]*`;
    m.reply(wait);
    let { data } = await axios.get("https://api.popcat.xyz/color/" + text);
    conn.sendFile(
      m.chat,
      data.color_image,
      null,
      Object.entries(data)
        .map(([a, b]) => `*• ${a} :* \`${b}\``)
        .join("\n"),
      m,
    );
  },
};
