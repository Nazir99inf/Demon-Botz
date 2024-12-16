let handler = async (m, { conn }) => {
let ye = `@${m.sender.split`@`[0]}`
let esce = `
Hai ${ye} 
\n– 乂 I N F O - S C R I P T*
\n◦  Name : \n◦  Modules Type  : CjsxEsm \n◦  Format : Plugins\n◦  Total Features : 600+ \n◦  Price : 65.000  \n◦  Review Bot :
\n Chat me wa.me/6285822146627
\n*– Support Pairing Code*\n*– Disk Used Average 700mb*\n*_ Bot Size 3mb*\n*– Clean Code*\n*– No Encrypt*\n*– Support Newsletter*


\n*– 乂 B E N E F I T*\n ◦  Free Update Always Time\n  ◦  Free Apikey Vip 30.000 Limit  \n  ◦  Free Fix\n  ◦  Free Hosting Bot

\n*– 乂 C O N T A C T - P E R S O N*
\n ◦   WhatsApp : https://wa.me/6285822146627`
m.reply(esce)
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i

module.exports = handler
