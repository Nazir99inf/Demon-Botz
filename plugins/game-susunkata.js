const { susunkata } = require("@bochilteam/scraper");
let timeout = 120000;

let handler = async (m, { conn, command, usedPrefix }) => {
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.chat;
  if (id in conn.susunkata) {
    conn.reply(
      m.chat,
      "You Already have question to answer !",
      conn.susunkata[id][0],
    );
  }
  let json = await susunkata();
  let caption = `*[ SUSUN KATA ]*
*• Timeout :* 60 seconds
*• Question :* ${json.soal} *[ ${json.tipe} ]*
*• Clue :* ${json.jawaban.replace(/[AIUEOaiueo]/g, "_")}

reply to this message to answer the question
type *\`nyerah\`* to surender`.trim();

  conn.susunkata[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    setTimeout(() => {
      if (conn.susunkata[id])
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
  conn.susunkata = conn.susunkata ? conn.susunkata : {};
  let id = m.chat;
  if (!m.text) return;
  if (m.isCommand) return;
  if (!conn.susunkata[id]) return;
  let json = await conn.susunkata[id][1];
  let reward = db.data.users[m.sender];
  if (
    m.text.toLowerCase() === "nyerah" ||
    m.text.toLowerCase() === "surender"
  ) {
    clearTimeout(await conn.susunkata[id][2]);
    conn.sendMessage(
      m.chat,
      {
        text: `Game Over !!
You lose with reason : *[ ${m.text} ]*

• Answer : *[ ${json.jawaban} ]*`,
      },
      { quoted: await conn.susunkata[id][0] },
    );
    delete conn.susunkata[id];
  } else if (m.text.toLowerCase() === json.jawaban.toLowerCase()) {
    reward.money += parseInt(10000);
    reward.limit += 10;
    clearTimeout(await conn.susunkata[id][2]);
    await conn.sendMessage(
      m.chat,
      {
        text: `Congratulations 🎉
you have successfully guessed the answer!

* *Money :* 10.000+
* *Limit :* 10+

Next question...`,
      },
      { quoted: await conn.susunkata[id][0] },
    );
    delete conn.susunkata[id];
    await conn.appendTextMessage(m, ".susunkata", m.chatUpdate);
  } else {
    conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key,
      },
    });
  }
};

handler.help = ["susunkata"];
handler.tags = ["game"];
handler.command = ["susunkata"];
handler.group = true;

module.exports = handler;
