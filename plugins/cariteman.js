//© AkiraaBot 2023-2024
// • Credits : wa.me/6287869975929 [ Bang syaii ]
// • Owner: 6287869975929,6283831945469

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

module.exports = {
  help: ["cariteman"].map((a) => a + " *[random tag]*"),
  tags: ["fun"],
  command: ["cariteman"],
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
    let user = db.data.users;
    let random = Func.random(Object.keys(user));
    let cap = `*[ RANDOM FRIENDS ]*
*• Name :* ${db.data.users[random].name}
*• Tags :* @${random.split("@")[0]}

Click button for send message to random friends !`;
    conn.sendUrl(
      m.chat,
      [
        [
          "Chat now",
          `https://wa.me/${random.split("@")[0]}?text=you+wanna+be+to+my+friend?`,
        ],
      ],
      m,
      {
        body: cap,
      },
    );
  },
};
