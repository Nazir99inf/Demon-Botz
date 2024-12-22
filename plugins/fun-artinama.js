let fetch = require("node-fetch");
let cheerio = require("cheerio");

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*•< Example :* ${usedPrefix + command} *[name]*`;
  let nama = text;
  let body = (
    await axios
      .get(
        "http://www.primbon.com/arti_nama.php?nama1=" +
          nama +
          "&proses=+Submit%21+",
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        },
      )
      .catch((e) => e.response)
  ).data;
  let $ = cheerio.load(body);
  var y = $.html().split("arti:")[1];
  var t = y.split('method="get">')[1];
  var f = y.replace(t, " ");
  var x = f.replace(/<br\s*[\/]?>/gi, "\n");
  var h = x.replace(/<[^>]*>?/gm, "");
  console.log("" + h);
  m.reply(`
Arti dari nama ${nama} adalah
-----------------------------------
Nama ${nama} ${h}
-----------------------------------`);
};
handler.help = ["artinama"].map((v) => v + " *[name]*");
handler.tags = ["fun"];
handler.command = ["artinama"];
handler.limit = true;

module.exports = handler;
