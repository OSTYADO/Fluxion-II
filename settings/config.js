

const fs = require('fs')

global.owner = "254713358303"
global.linkch = "https://whatsapp.com/channel/0029VaPZWbY1iUxVVRIIOm0D"
global.link = "https://whatsapp.com/channel/0029VaPZWbY1iUxVVRIIOm0D"
global.autotyping = false
global.autorecording = false
global.antipromote = false
global.antidemote = false
global.status = true
global.welcome = true
global.autoread = false //auto read messages
global.autobio = true //auto update bio
global.anti91 = false 
global.autoswview = true //auto view status/story
global.adminevent = false // Admin Event Msg
global.antilink= false; // Default: disabled
global.autostatusReact = true; // Default: disabled
global.reactEmoji = '😀';
global.antiforeign = ""
global.antibot = false;
//Thank you for using FLUXION-XMD







































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































global.mess = {
    owner: "𝐎𝐧𝐥𝐲 𝐟𝐨𝐫 𝐦𝐲 𝐨𝐰𝐧𝐞𝐫",
    group: "𝐒𝐭𝐫𝐢𝐜𝐭𝐥𝐲 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩𝐬",
    private: "𝐓𝐡𝐢𝐬 𝐢𝐬 𝐟𝐨𝐫 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐜𝐡𝐚𝐭𝐬",
   botAdmin: "𝐌𝐚𝐤𝐞 𝐦𝐞 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧 𝐟𝐢𝐫𝐬𝐭",
    Admins: "𝐔𝐬𝐞 𝐭𝐡𝐢𝐬 𝐰𝐡𝐞𝐧 𝐲𝐨𝐮 𝐛𝐞𝐜𝐨𝐦𝐞 𝐚𝐧 𝐚𝐝𝐦𝐢𝐧",
    wait : "𝐂𝐡𝐢𝐥𝐥 𝐚 𝐦𝐨𝐦𝐞𝐧𝐭..."
}
global.botname = "𝐅𝐋𝐔𝐗𝐈𝐎𝐍 𝐈𝐈"
global.packname = '𝙁𝙇𝙐𝙓𝙄𝙊𝙉 𝙄𝙄'
global.author = 'ꂦꌚꋖꐞꁲꂠꂦ ™®'
global.pairing = "FLUXYVII"
global.APIs = {   
  fluxa: 'https://api.botcahx.eu.org'
}
global.fluxa = 'Fluxion' 
global.APIKeys = { 
  'https://api.botcahx.eu.org': global.fluxa
}

global.KEY = "GET APIKEY elevenlabs.io"
global.IDVOICE = "GET ON elevenlabs.io"

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
