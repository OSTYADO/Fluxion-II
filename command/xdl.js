const fetch = require("node-fetch");
  let handler = async (m,{res, client, text, prefix}) =>{
if (!text) return res("𝙿𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚃𝚠𝚒𝚝𝚝𝚎𝚛 𝚕𝚒𝚗𝚔!");

try {

const data = await fetchJson(`https://api.dreaded.site/api/alldl?url=${text}`);

if (!data || data.status !== 200 || !data.data || !data.data.videoUrl) {
            return res("𝙽𝚘 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎 𝚏𝚛𝚘𝚖 𝙰𝙿𝙸");
        }

const twtvid = data.data.videoUrl;

await client.sendMessage(m.chat,{video : {url : twtvid },caption : `©𝐅𝐋𝐔𝐗𝐈𝐎𝐍`,gifPlayback : false },{quoted : m}) 

} catch (e) {

m.reply("𝙰𝚙𝚒 𝚏𝚊𝚒𝚕𝚞𝚛𝚎\n" + e)

}

 }
 handler.help = ["xdownloader"];
 handler.tags = ["download"];
 handler.command = ["xdl", "twtdl"];
 module.exports = handler;