

const axios = require('axios');

let handler = async (m, { text, client, res}) => {
  if (!text) return m.reply('Masukkan URL MediaFire-nya.');
  try {
    let { data } = await axios.get('https://fgsi1-restapi.hf.space/api/downloader/mediafire?url=' + encodeURIComponent(text));
    if (!data.status) return res( 'Gagal mengambil data');
    let { downloadUrl, filename } = data.data;
    await client.sendMessage(m.chat, {
      document: { url: downloadUrl },
      fileName: filename,
      mimetype: 'application/zip'
    }, { quoted: m });
  } catch (e) {
    m.reply(e);
  }
};

handler.help = ['dl-mf'];
handler.command = ['mfdl','mediafire'];
handler.tags = ['downloader']

module.exports = handler;

const Mollygram = async (username) => {
  const { data } = await axios.get(`https://media.mollygram.com/?url=${encodeURIComponent(username)}`, {
    headers: {
      'accept': '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      'origin': 'https://mollygram.com',
      'referer': 'https://mollygram.com/',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    }
  })
  const html = data.html
  const getMatch = (regex) => html.match(regex)?.[1]?.trim() || null
 
  const profilePic = getMatch(/<img[^>]*class="[^"]*rounded-circle[^"]*"[^>]*src="([^"]+)"/i) || getMatch(/<img[^>]*src="([^"]+)"[^>]*class="[^"]*rounded-circle[^"]*"/i)
  
  return {
    username: getMatch(/<h4 class="mb-0">([^<]+)<\/h4>/),
    fullname: getMatch(/<p class="text-muted">([^<]+)<\/p>/),
    bio: getMatch(/<p class="text-dark"[^>]*>([^<]+)<\/p>/),
    profilePic,
    posts: getMatch(/<div[^>]*>\s*<span class="d-block h5 mb-0">([^<]+)<\/span>\s*<div[^>]*>posts<\/div>/i),
    followers: getMatch(/<div[^>]*>\s*<span class="d-block h5 mb-0">([^<]+)<\/span>\s*<div[^>]*>followers<\/div>/i),
    following: getMatch(/<div[^>]*>\s*<span class="d-block h5 mb-0">([^<]+)<\/span>\s*<div[^>]*>following<\/div>/i)
  }
}
 
let gram = async (m, { client, args, res}) => {
  if (!args[0]) return res( '*Example :* .igstalk mycyll.7')
  
  const yatta = await Mollygram(args[0])
  
  const text = `*Username :* ${yatta.username}\n*Full name :* ${yatta.fullname}\n*Bio :* ${yatta.bio}\n*Posts :* ${yatta.posts}\n*Follower :* ${yatta.followers}\n*Follow :* ${yatta.following}`
  
  if (yatta.profilePic) {
    await client.sendMessage(m.chat, { image: { url: yatta.profilePic }, caption: text }, { quoted: m })
  } else {
    await res(text)
  }
}
 
gram.help = ['igstalk']
gram.command = ['igstalk']
gram.tags = ['tools']
 
module.exports = gram;