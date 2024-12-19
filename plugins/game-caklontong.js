const { caklontong } = require("@bochilteam/scraper");
let timeout = 120000;

let handler = async (m, { conn, command, usedPrefix }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (id in conn.caklontong) {
    conn.reply(
      m.chat,
      "You Already have question to answer !",
      conn.caklontong[id][0],
    );
  }
  let json = await caklontong();
  let caption = `*[ CAK LONTONG ]*
*• Timeout :* 60 seconds
*• Question :* ${json.soal}
*• Clue :* ${json.jawaban.replace(/[AIUEOaiueo]/g, "_")}

reply to this message to answer the question
type *\`nyerah\`* to surender`.trim();

  conn.caklontong[id] = [
    conn.reply(m.chat, caption, m),
    json,
    setTimeout(() => {
      if (conn.caklontong[id])
        conn.sendMessage(
          id,
          {
            text: `Game Over !!
You lose with reason : *[ Timeout ]*

• Answer : *[ ${json.jawaban} ]*`,
          },
          { quoted: m },
        );
      delete conn.tebaklogo[id];
    }, timeout),
  ];
};

handler.before = async (m, { conn }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (!m.text) return;
  if (m.isCommand) return;
  if (!conn.caklontong[id]) return;
  let json = await conn.caklontong[id][1];
  let reward = db.data.users[m.sender];
  if (
    m.text.toLowerCase() === "nyerah" ||
    m.text.toLowerCase() === "surender"
  ) {
    clearTimeout(await conn.caklontong[id][2]);
    conn.sendMessage(
      m.chat,
      {
        text: `Game Over !!
You lose with reason : *[ ${m.text} ]*

• Answer : *[ ${json.jawaban} ]*`,
      },
      { quoted: await conn.caklontong[id][0] },
    );
    delete conn.caklontong[id];
  } else if (m.text.toLowerCase() === json.jawaban.toLowerCase()) {
    reward.money += parseInt(10000);
    reward.limit += 10;
    clearTimeout(await conn.caklontong[id][2]);
    await conn.sendMessage(
      m.chat,
      {
        text: `Congratulations 🎉
you have successfully guessed the answer!

* *Money :* 10.000+
* *Limit :* 10+

Next question...`,
      },
      { quoted: await conn.caklontong[id][0] },
    );
    delete conn.caklontong[id];
    await conn.appendTextMessage(m, ".caklontong", m.chatUpdate);
  } else {
    conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key,
      },
    });
  }
};

handler.help = ["caklontong"];
handler.tags = ["game"];
handler.command = ["caklontong"];
handler.group = true;

module.exports = handler;
