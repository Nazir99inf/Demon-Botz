//© AkiraaBot 2023-2024
// • Credits : wa.me/6287869975929 [ Bang syaii ]
// • Owner: 6287869975929,6283831945469

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

module.exports = {
  help: ["lolivid"].map((a) => a + " *[random video loli]*"),
  tags: ["fun"],
  command: ["lolivid"],
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
    m.reply(
      "*[ RANDOM VIDEO LOLI ]*",
      "https://api.cafirexos.com/api/anime/lolivid",
    );
  },
};
