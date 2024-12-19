let timeout = 120000;

let handler = async (m, { conn, command, usedPrefix }) => {
  conn.tebakanime = conn.tebakanime ? conn.tebakanime : {};
  let id = m.chat;
  if (id in conn.tebakanime) {
    conn.reply(
      m.chat,
      "You Already have question to answer !",
      conn.tebakanime[id][0],
    );
  }
  let src = await tebakanime();
  let Apps = src[Math.floor(Math.random() * src.length)];
  let json = Apps;
  let caption = `*[ TEBAK ANIME ]*
*• Timeout :* 60 seconds
*• Question :* Guess the anime title based on the picture
*• Clue :* ${json.title.replace(/[AIUEOaiueo]/g, "_")}

Reply to this message to answer the question
Type *\`nyerah\`* to surrender`.trim();

  conn.tebakanime[id] = [
    conn.sendFile(m.chat, json.img, null, caption, m),
    json,
    setTimeout(() => {
      if (conn.tebakanime[id])
        conn.sendMessage(
          id,
          {
            text: `Game Over !!
You lose with reason : *[ Timeout ]*

• Answer : *[ ${json.title} ]*`,
          },
          { quoted: m },
        );
      delete conn.tebakanime[id];
    }, timeout),
  ];
};

handler.before = async (m, { conn }) => {
  conn.tebakanime = conn.tebakanime ? conn.tebakanime : {};
  let id = m.chat;
  if (!m.text) return;
  if (m.isCommand) return;
  if (!conn.tebakanime[id]) return;
  let json = await conn.tebakanime[id][1];
  let reward = db.data.users[m.sender];
  if (
    m.text.toLowerCase() === "nyerah" ||
    m.text.toLowerCase() === "surender"
  ) {
    clearTimeout(await conn.tebakanime[id][2]);
    conn.sendMessage(
      m.chat,
      {
        text: `Game Over !!
You lose with reason : *[ ${m.text} ]*

• Answer : *[ ${json.title} ]*`,
      },
      { quoted: await conn.tebakanime[id][0] },
    );
    delete conn.tebakanime[id];
  } else if (m.text.toLowerCase() === json.title.toLowerCase()) {
    reward.money += parseInt(10000);
    reward.limit += 10;
    clearTimeout(await conn.tebakanime[id][2]);
    await conn.sendMessage(
      m.chat,
      {
        text: `Congratulations 🎉
you have successfully guessed the answer!

* *Money :* 10.000+
* *Limit :* 10+

Next question...`,
      },
      { quoted: await conn.tebakanime[id][0] },
    );
    delete conn.tebakanime[id];
    await conn.appendTextMessage(m, ".tebakanime", m.chatUpdate);
  } else {
    conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key,
      },
    });
  }
};

handler.help = ["tebakanime"];
handler.tags = ["game"];
handler.command = ["tebakanime"];
handler.group = true;

module.exports = handler;

async function tebakanime() {
  return [
    { img: "https://files.catbox.moe/lwq1y4.jpg", title: "Oshi no Ko" },
    { img: "https://files.catbox.moe/8dliwy.jpg", title: "Yuru Camp" },
    { img: "https://files.catbox.moe/4c0g6c.jpg", title: "Bocchi the Rock" },
    { img: "https://files.catbox.moe/wrmo4u.jpg", title: "Wind Breaker" },
    { img: "https://files.catbox.moe/uahk3t.jpg", title: "Dungeon Meshi" },
    { img: "https://files.catbox.moe/h45rma.png", title: "Kaiju no 8" },
    { img: "https://files.catbox.moe/qld4dh.jpg", title: "Kannagi" },
    { img: "https://files.catbox.moe/qcigk2.jpg", title: "Shangi-La Frontier" },
    { img: "https://files.catbox.moe/g4l0wn.jpg", title: "Solo Leveling" },
    { img: "https://files.catbox.moe/mup2x5.jpg", title: "Ragna Crimson" },
    { img: "https://files.catbox.moe/4gk1f7.png", title: "Mashle" },
    {
      img: "https://files.catbox.moe/kjisyh.jpg",
      title: "Isekai Nonbiri Nouka",
    },
    {
      img: "https://files.catbox.moe/6adv3x.jpg",
      title: "Classroom of the Elite",
    },
    {
      img: "https://files.catbox.moe/boh0z0.jpg",
      title: "Kusuriya no Hitorigoto",
    },
    { img: "https://files.catbox.moe/zeufc4.jpg", title: "Sosou no Frieren" },
    { img: "https://files.catbox.moe/1dm2sk.jpg", title: "Mushoku Tensei" },
  ];
}
