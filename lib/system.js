const cron = require("node-cron");
const Function = require("./func.js");
const Func = new Function();
const fetch = require("node-fetch");
const {
    xeec
} = require("child_process");
const FileType = require("file-type");
const path = require("path");
const schedule = require('node-schedule');
const util = require("util");
const moment = require("moment-timezone");
const pesan = false;
const fs = require("fs");
const chalk = require("chalk");
global.database = new Map();

// Message filter
global.usedCommandRecently = new Set();

/**
 * Check if number is filtered.
 * @param {String} from 
 * @returns {Boolean}
 */
const isFiltered = (from) => {
    return usedCommandRecently.has(from);
};

/**
 * Add number to filter.
 * @param {String} from 
 */
const addFilter = (from) => {
    usedCommandRecently.add(from);
    setTimeout(() => {
        usedCommandRecently.delete(from);
        database.delete(from);
        console.log(chalk.cyan.bold("[ SPAM ] Spam Clear for : " + from))
    }, 10 * 1000);
};

const addSpam = (jid) => {
    if (database.has(jid)) {
        let user = database.get(jid);
        user.spam += 1;
    } else {
        database.set(jid, {
            id: jid,
            spam: 1,
            expired: Date.now() + 300000
        });
    }
};

module.exports = async (m, conn = {}) => {
try {
    if (m.mtype === "protocolMessage") return;
    const groupMetadata = (m.isGroup ? conn.chats[m.chat].metadata : []) || []
    const participants = (m.isGroup ? groupMetadata.participants : []) || [];
    const user =
        (m.isGroup ?
            participants.find((u) => conn.decodeJid(u.id) === m.sender) :
            {}) || {}; // User Data
    const bot =
        (m.isGroup ?
            participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) :
            {}) || {}; // Bot Data
    const isRAdmin = user?.admin === "superadmin" || false;
    const isAdmin = isRAdmin || user?.admin === "admin" || false; // Is User Admin?
    const isBotAdmin = bot?.admin || false; // Is Bot Admin?
    const isOwner = global.owner.includes(m.sender.split("@")[0]);

cron.schedule('0 0 * * *',async() => { 
            let id = Object.keys(store.groupMetadata);
            let users = global.db.data.users;
            let resetUsers = Object.entries(users).filter(
                ([user, data]) => data.limit < 10000000,
            );

            if (resetUsers.length) {
                let limit = 100;
                resetUsers.forEach(([user, data]) => {
                    data.limit = limit;
                });
            }
            for (let i of id) {
                let cap = `*乂 R E S E T - L I M I T*

- *Limit Free Plan :* 100/day   

System Sucess reset Limit for free plan
upgrade to premium for get unlimited limit !

${done}`
           conn.sendMessage(i, {
               text: cap
            });
      }
});

    const chat = db.data.chats[m.chat];
    let detect = false;
    if (chat.antiBot) {
        if (m.isBaileys || m.id.startsWith("3EB0")) {
            if (isAdmin) return;
            if (!isBotAdmin) return;
            if (m.id.startsWith("AKIRAA")) return 
            if (!m.fromMe) {
                await conn.sendMessage(m.chat, {
                    text: `*+ A N T I -  B O T*
          
*Metadata Info:*
- Device: ${m.device}
- ID: ${m.id}

Sorry, your message ID has been blocked from this group!`,
                });
                await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
                await conn.delay(2000);
                detect = true;
            }
        }
    }
    let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
    if (m.isGroup) {
        let isGroupLink = linkRegex.exec(m.text);
        if (isAdmin) return;
        if (!isBotAdmin) return;
        if (chat.antiLink && isGroupLink) {
          db.data.users[m.sender].warn += 1
            m.reply(`*+ A N T I - L I N K*
      
Sorry, you can't send another url to this group.
You have received ${db.data.users[m.sender].warn || 0}/5 warnings.`);
            conn.sendMessage(m.chat, {
                delete: {
                    ...m.key,
                },
            });
        }
    }
    if (m.isCommand) {
        addFilter(m.sender)
        if (!database.has(m.sender)) return addSpam(m.sender);
        if (isFiltered(m.sender) && m.isCommand) {
            let spamming = database.get(m.sender)
            if (spamming.spam < 5) {
                spamming.spam += 1
                conn.sendMessage(m.chat, {
                    text: `*+ S P A M - D E T E C T*
          
System detected that you are spamming commands!
Please wait for a cooldown period of *5 seconds* and then try again.`
                }, {
                    quoted: m
                })
            } else {
                conn.sendMessage(m.chat, {
                    text: `*+ B A N - T E M P O R A R Y*

You have been banned from the system due to spamming!  
You cannot use the bot for the next 30 seconds.`
                }, {
                    quoted: m
                })
                database.delete(m.sender)
                db.data.users[m.sender].banned = true
                if (db.data.users[m.sender].banned) {
                    setTimeout(() => {
                        db.data.users[m.sender].banned = false
                        conn.sendMessage(m.chat, {
                            react: {
                                key: m.key,
                                text: "✅"
                            }
                        })
                    }, 30 * 1000);
                }
            }
        }
    }
    const jobs = [{
            time: '00:00',
            schedule: '0 0 * * *',
            message: `*[System Notice]*\n\n\`\`\`Halo semua, maaf mengganggu. Sistem grup WhatsApp akan ditutup sementara karena sudah larut malam. Mohon maaf atas ketidaknyamanannya. Silakan istirahat yang baik dan kita akan melanjutkan percakapan besok pagi. Terima kasih atas pengertian dan kerjasamanya. Selamat malam!.\`\`\``,
            setting: 'announcement',
        },
        {
            time: '08:00',
            schedule: '0 8 * * *',
            message: `*[System Notice]*\n\n\`\`\`Selamat pagi, teman-teman! Semoga hari ini penuh dengan semangat dan kebahagiaan. Mari kita mulai hari ini dengan semangat yang tinggi dan berbagi kebaikan di grup WhatsApp kita. Selamat beraktivitas dan semoga hari ini menjadi hari yang produktif dan menyenangkan bagi kita semua.\`\`\``,
            setting: 'not_announcement',
        },
        {
            time: '18:00',
            schedule: '0 18 * * *',
            message: `*[System Notice]*\n\n\`\`\`Halo semuanya! Sistem grup WhatsApp akan ditutup sementara karena sudah memasuki waktu magrib. Silakan istirahat sejenak dan nikmati waktu bersama keluarga atau melakukan aktivitas lainnya. Kami akan membuka kembali sistem grup ini setelah waktu Maghrib. Terima kasih atas pengertian dan kerjasamanya. Selamat beristirahat!\`\`\``,
            setting: 'announcement',
        },
        {
            time: '18:10',
            schedule: '10 18 * * *',
            message: `*[System Notice]*\n\n\`\`\`Selamat malam semuanya! Sistem grup WhatsApp telah dibuka setelah magrib. Semoga kita semua telah menjalankan ibadah dengan baik dan mendapatkan berkah di hari ini. Mari kita berbagi cerita, informasi, dan kebahagiaan bersama di grup ini. Selamat bergabung dan semoga kita memiliki waktu yang menyenangkan!\`\`\``,
            setting: 'not_announcement',
        },
        {
            time: '22:00',
            schedule: '0 22 * * *',
            message: `*[System Notice]*\n\n\`\`\`Selamat malam semuanya! Sudsh waktunya grup ini ditutup karena sudsh malam, grup akan dibuka jam 05:00 Wib pagi hari\`\`\``,
            setting: 'announcement',
        },
    ];
    jobs.forEach((job) => {
        const perintah = cron.schedule(job.schedule, async () => {
            const time = moment.tz('Asia/Jakarta').format('HH:mm');
            const data = require(process.cwd() + "/database/group.json")
            for (let idgc of data) {
                const anon = store.groupMetadata[idgc].announce;
                if (
                    time === job.time &&
                    ((job.setting === 'announcement' && anon === false) ||
                        (job.setting === 'not_announcement' && anon === true))
                ) {
                    await conn.groupSettingUpdate(idgc, job.setting);
                    await conn.delay(1000);
                    await conn.reply(idgc, job.message, null);
                }
            }
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        });
        perintah.start()
    });

    conn.ev.on("call", async (respon) => {
        for (let user of respon) {
            if (user.status === "ringing") {
                await conn.reply(user.from, `*+ C A L L - D E T E C T E D*
 
The system detected that you sent a ${user.isVideo ? 'video call' : 'voice call'} to this bot. Sorry, I will block you.`, null);
                await conn.updateBlockStatus(user.from, "block")
                break
            }
        }
    })
 conn.getFile = async (PATH, returnAsFilename) => {
    let res, filename;
    const data = Buffer.isBuffer(PATH)
      ? PATH
      : /^data:.*?\/.*?;base64,/i.test(PATH)
        ? Buffer.from(PATH.split`,`[1], "base64")
        : /^https?:\/\//.test(PATH)
          ? await (res = await fetch(PATH)).buffer()
          : fs.existsSync(PATH)
            ? ((filename = PATH), fs.readFileSync(PATH))
            : typeof PATH === "string"
              ? PATH
              : Buffer.alloc(0);
    if (!Buffer.isBuffer(data)) throw new TypeError("Result is not a buffer");
    const type = (await FileType.fromBuffer(data)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    if (data && returnAsFilename && !filename)
      (filename = path.join(
        __dirname,
        "../tmp/" + new Date() * 1 + "." + type.ext,
      )),
        await fs.promises.writeFile(filename, data);
    return {
      res,
      filename,
      ...type,
      data,
      deleteFile() {
        return filename && fs.promises.unlink(filename);
      },
    };
 }
  if (db.data.users[m.sender].warn >= 4) {
   let cap = `*乂 B A N N E D - U S E R*
   
Sorry you have reached the warning limit on this bot !
${m.isGroup ? "I will remove you from this group" : "I will ban you from this bot"}`
     await conn.reply(m.chat, cap, m);
     await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
                await conn.delay(2000);
     await conn.updateBlockStatus(user.from, "block")
  }
 } catch(e) {
   if (/overlimit|time|out/.test(e.message)) return
 }
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    delete require.cache[file];
    if (global.reloadHandler) console.log(global.reloadHandler());
});