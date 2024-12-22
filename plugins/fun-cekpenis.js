//© AkiraaBot 2023-2024
// • Credits : wa.me/6287869975929 [ Bang syaii ]
// • Owner: 6283831945469,6287869975929

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

let handler = async (m, { conn, text, usedPrefix }lp) => {
    if (!text) throw 'masukkan nama';
    try {
    let rand = Math.floor(Math.random() * 10);
    let name = text;
    let warna = ["hitam", "putih", "coklat", "pelangi"];
    let txt = "";
    if (rand == 0) return;
    if (rand > 5) {
      txt = "Alamak Panjang nye 😋";
    } else if (rand < 5) {
      txt = "Ah Normal ini mah";
    }
    if (rand < 3) {
      txt = "Kecil amat 😂";
    }
    m.reply(`┌─⭓「 *CEK PENIS*  」
│ *• Nama :* ${name}
│ *• Ukuran :* ${rand.toFixed(1)} cm
│ *• Warna :* ${warna[Math.floor(Math.random() * warna.length)]}
│ *• Pesan :* ${txt}
└───────────────⭓`);
  },
};
handler.command = handler.help = ['cekpenis'];
handler.tags = ['fun'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
 
module.exports = handler;
