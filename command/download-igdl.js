

const axios = require('axios')
let handler = async (m, { client, text, res, reaction, prefix, command }) => {
    if (!text) return res(`\n*ex:* ${prefix + command} https://www.instagram.com/reel/DB8BGCZRKAh/?igsh=eDk1ajRncDV6Mjdh\n`);
    
   
        await reaction(m.chat, "⚡");
        try{
        const { data } = await axios.get(
      `https://api.ootaizumi.web.id/downloader/instagram?url=${encodeURIComponent(text)}`
     
    );
    const mediaUrl = data.media;
    const Text = data.result.title; 
      
                        await client.sendMessage(m.chat, {
                            video: { url: mediaUrl },
                            caption: Text
                        }, { quoted: m });
                  
            } catch (error) {
                console.error(error);
                res(error)
            };

    }
    
handler.help = ['downloader instagram'];
handler.tags = ['downloader'];
handler.command = ["igdl"];

module.exports = handler;
