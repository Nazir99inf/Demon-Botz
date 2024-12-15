global.owner = ['6285822146627']  
global.mods = ['6285822146627'] 
global.prems = ['6285822146627']
global.nameowner = 'Nazir'
global.numberowner = '6285822146627' 
global.mail = 'nazir99iq@gmail.com' 
global.gc = 'https://chat.whatsapp.com/Fb1V5mV2qIKILLPXC66clV'
global.instagram = ''
global.wm = 'Success Reslut - © Nazir'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'YouKnowZir | 6285822146627'
global.autobio = false // Set true untuk mengaktifkan autobio
global.maxwarn = '3' // Peringatan maksimum
global.antiporn = false // Auto delete pesan porno (bot harus admin)
global.fakestatus = (txt) => {
  return {
    key: {
      remoteJid: "0@s.whatsapp.net",
      participant: "0@s.whatsapp.net",
      id: "",
    },
    message: {
      conversation: txt,
    },
  };
};
global.fkontak = {
  key: {
    remoteJid: "0@s.whatsapp.net",
    participant: "0@s.whatsapp.net",
    id: "",
  },
  message: {
    conversation: `*Nazir*`,
  },
};
//INI WAJIB DI ISI!//
global.btc = 'YOUR_APIKEY_HERE' 
//Daftar terlebih dahulu https://api.botcahx.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.lann = ''
//Daftar https://api.betabotz.eu.org 

//jangan diganti!
global.APIs = {   
  btc: 'https://api.botcahx.eu.org'
}

//ini tidak di isi juga tidak apa-apa
global.APIKeys = { 
  'https://api.botcahx.eu.org': 'APIKEY' 
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
  
