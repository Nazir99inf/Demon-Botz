//© AkiraaBot 2023-2024
// • Credits : wa.me/6287869975929 [ Bang syaii ]
// • Owner: 6283831945469,6281910094713

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

let timeout = 120000;

let handler = async (m, { conn, command, usedPrefix }) => {
  conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {};
  let id = m.chat;
  if (id in conn.lengkapikalimat) {
    conn.reply(
      m.chat,
      "You Already have question to answer !",
      conn.lengkapikalimat[id][0],
    );
  }
  let json = await (
    await fetch(
      "https://raw.githubusercontent.com/qisyana/scrape/main/lengkapikalimat.json",
    )
  ).json();
  let caption = `*[ LEBGKAPI KALIMAT ]*
*• Timeout :* 60 seconds
*• Question :* ${json.pertanyaan}
*• Clue :* ${json.jawaban.replace(/[AIUEOaiueo]/g, "_")}

reply to this message to answer the question
type *\`nyerah\`* to surender`.trim();

  conn.lengkapikalimat[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    setTimeout(() => {
      if (conn.lengkapikalimat[id])
        conn.sendMessage(
          id,
          {
            text: `Game Over !!
You lose with reason : *[ Timeout ]*

• Answer : *[ ${json.jawaban} ]*`,
          },
          {
            quoted: m,
          },
        );
      delete conn.lengkapikalimat[id];
    }, timeout),
  ];
};

handler.before = async (m, { conn }) => {
  conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {};
  let id = m.chat;
  if (!m.text) return;
  if (m.isCommand) return;
  if (!conn.lengkapikalimat[id]) return;
  let json = await conn.lengkapikalimat[id][1];
  let reward = db.data.users[m.sender];
  if (
    m.text.toLowerCase() === "nyerah" ||
    m.text.toLowerCase() === "surender"
  ) {
    clearTimeout(await conn.lengkapikalimat[id][2]);
    conn.sendMessage(
      m.chat,
      {
        text: `Game Over !!
You lose with reason : *[ ${m.text} ]*

• Answer : *[ ${json.jawaban} ]*`,
      },
      {
        quoted: await conn.lengkapikalimat[id][0],
      },
    );
    delete conn.lengkapikalimat[id];
  } else if (m.text.toLowerCase() === json.jawaban.toLowerCase()) {
    reward.money += parseInt(10000);
    reward.limit += 10;
    clearTimeout(await conn.lengkapikalimat[id][2]);
    await conn.sendMessage(
      m.chat,
      {
        text: `Congratulations 🎉
you have successfully guessed the answer!

* *Money :* 10.000+
* *Limit :* 10+

Next question...`,
      },
      {
        quoted: await conn.lengkapikalimat[id][0],
      },
    );
    delete conn.lengkapikalimat[id];
    await conn.appendTextMessage(m, ".lengkapikalimat", m.chatUpdate);
  } else {
    conn.sendMessage(m.chat, {
      react: {
        text: "❌",
        key: m.key,
      },
    });
  }
};

handler.help = ["lengkapikalimat"];
handler.tags = ["game"];
handler.command = ["lengkapikalimat"];
handler.group = true;

module.exports = handler;
