

const axios = require('axios')
const { igdl } = require('../start/lib/function/igdl')

let handler = async (m, { client, text, res, reaction, prefix, command }) => {
    if (!text) return res(`\n*ex:* ${prefix + command} https://www.instagram.com/reel/DB8BGCZRKAh/?igsh=eDk1ajRncDV6Mjdh\n`);
    
        let memek = await igdl(text);
        await reaction(m.chat, "⚡");
    
        let respon = memek.data;
        if (respon && respon.length > 0) {
        
            let uniqueUrls = new Set(respon.map(item => item.url));
            try {
                for (let mediaUrl of uniqueUrls) {
                    const headResponse = await axios.head(mediaUrl);
                    const mimeType = headResponse.headers['content-type'];

                    const isImage = /image\/.*/.test(mimeType);
                    const isVideo = /video\/.*/.test(mimeType);

                    if (isImage) {
                        await client.sendMessage(m.chat, {
                            image: { url: mediaUrl },
                            caption: "𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙚𝙙 𝙗𝙮 𝙁𝙡𝙪𝙭𝙞𝙤𝙣 𝙄𝙄"
                        }, { quoted: m });
                    } else if (isVideo || mimeType === 'application/octet-stream') {
                        await client.sendMessage(m.chat, {
                            video: { url: mediaUrl },
                            caption: "𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙚𝙙 𝙗𝙮 𝙁𝙡𝙪𝙭𝙞𝙤𝙣 𝙄𝙄."
                        }, { quoted: m });
                    } else {
                        await client.sendMessage(m.chat, {
                            text: `tipe media tidak didukung: ${mimeType}`
                        }, { quoted: m });
                    }
                }
            } catch (error) {
                console.error(error);
                res(error)
            }
        } else {
            await client.sendMessage(m.chat, {
                text: "Tidak ditemukan media atau terjadi kesalahan saat mengambil media."
            }, { quoted: m });
        }
    }
    
handler.help = ['downloader instagram'];
handler.tags = ['downloader'];
handler.command = ["igdl"];

module.exports = handler;
