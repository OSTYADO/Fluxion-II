

require('../settings/config');
const { ytmp3 } = require('../start/lib/function/ytmp3')
const yts = require('yt-search');
const axios = require("axios")
async function getBuffer(url, options) {
    try {
        options = options || {};
        const rslts = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return rslts.data;
    } catch (err) {
        return err;
    }
}

let handler = async (m, { client, text, res, quoted, reaction, prefix, command }) => {
    if (!text) return res(`\n*ex:* ${prefix + command} Faded\n`);
    
    await reaction(m.chat, '🎼');
    
    let rus = await yts(text);
    if (rus.all.length === 0) return res("Video not found or cannot be downloaded.");
    
    let data = rus.all.filter(v => v.type === 'video');
    if (data.length === 0) return res("No video found.");
    
    let rsl = data[0];
    let thumbUrl = `https://i.ytimg.com/vi/${rsl.videoId}/hqdefault.jpg`;
    let inithumb = await getBuffer(thumbUrl);
    
    let telaso = rsl.url;
    let mbut = await ytmp3(telaso);
    
    if (!mbut || !mbut.urlmp4) return res("Failed to download audio.");
    
    await client.sendMessage(m.chat, {
        audio: { url: mbut.urlmp4 },
        mimetype: 'audio/mpeg',
        ptt: false,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: rsl.title,
                body: rsl.author.name,
                mediaType: 2,
                mediaUrl: rsl.url,
                sourceUrl: rsl.url,
                thumbnail: inithumb,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};
    
    
   /*
    client.sendMessage(m.chat, {
        audio: { url: ahh },
        mimetype: "audio/mpeg", 
        ptt: true
    }, { quoted: m })*/


handler.help = ['downloader music']
handler.tags = ['downloader']
handler.command = ["play"]

module.exports = handler
