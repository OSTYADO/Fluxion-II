const axios = require("axios");
let handler = async (m,{res,client, text, prefix, reaction}) => {
if (!text) {
        return m.reply("𝚆𝚑𝚎𝚛𝚎 𝚒𝚜 𝚝𝚑𝚎 𝚏𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝚕𝚒𝚗𝚔");
    }

    if (!text.includes("facebook.com")) {
        return m.reply("𝚃𝚑𝚊𝚝𝚜 𝚗𝚘𝚝 𝚊 𝚏𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝚕𝚒𝚗𝚔");
    }

    try {
            const { data } = await axios.get(
      `https://api.ootaizumi.web.id/downloader/facebook?url=${encodeURIComponent(text)}`
    );
    

        const fbvid = data.result.downloads[1].url;

        if (!fbvid) {
            return m.reply("𝙿𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚕𝚒𝚗𝚔");
        }

        await client.sendMessage(
            m.chat,
            {
                video: { url: fbvid },
                caption: "𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚍 𝚋𝚢 𝙵𝚕𝚞𝚡𝚒𝚘𝚗",
                gifPlayback: false,
            },
            { quoted: m }
        );
    } catch (e) {
        console.error("Error occurred:", e);
        m.reply("An error occurred. API might be down. Error: " + e.message);
    }
}
handler.help = ["fbdl"];
handler.tags = ["download"];
handler.command = ["fbdl"];
module.exports = handler;
 