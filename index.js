// =============================================
// VERSION UPDATE
// UPDATE TERAKHIR 15 November 2024 JAM 00:00 WIB
// GITHUB : TanakaDomp
// VERSION : 1.1.0
// =============================================

require('./settings/config')
const { default: makeWASocket, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, PHONENUMBER_MCC, fetchLatestBaileysVersion, makeInMemoryStore, jidDecode, proto, delay, prepareWAMessageMedia, generateWAMessageFromContent, generateForwardMessageContent, getContentType, downloadContentFromMessage, fetchLatestWaWebVersion } = require("@whiskeysockets/baileys");
const fs = require("fs");
const pino = require("pino");
const axios = require('axios')
const path = require('path')

const fetch = require("node-fetch")
const FileType = require('file-type')
const _ = require('lodash')
const chalk = require('chalk')
const os = require('os');
const lolcatjs = require('lolcatjs')
const moment = require('moment-timezone')
const now = moment().tz('Africa/Nairobi')
const wita = now.clone().tz("Africa/Nairobi").locale("id").format("HH:mm:ss z")
const { Boom } = require("@hapi/boom");
const PhoneNumber = require("awesome-phonenumber");
const readline = require("readline");
const { formatSize, runtime, sleep, serialize, smsg, color, getBuffer } = require("./start/lib/myfunction")
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./start/lib/exif')
const { toAudio, toPTT, toVideo } = require('./start/lib/converter')
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

const low = require('./start/lib/lowdb');
const { Low, JSONFile } = low;
//const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
const dbPath = './start/database.json';

let db = new JSONFile(dbPath);

global.db = new Low(db);
global.DATABASE = global.db;

global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000));
if (global.db.data !== null) return;

global.db.READ = true;
await global.db.read();
global.db.READ = false;

global.db.data = {
users: {},
chats: {},
database: {},
groups: {},
game: {},
settings: {},
others: {},
sticker: {},
...(global.db.data || {})
};

global.db.chain = _.chain(global.db.data);
};

global.loadDatabase();

process.on('uncaughtException', console.error);

if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

function createTmpFolder() {
    const folderName = "tmp"; 
    const folderPath = path.join(__dirname, folderName); 

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}

createTmpFolder(); 
let phoneNumber = "254754783972"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const usePairingCode = true
    const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
     }
    );
return new Promise((resolve) => {
    rl.question(text, resolve)
   }
  )
};

async function Wconnect() {
const readline = require("readline");
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})
};



const { version, isLatest } = await fetchLatestBaileysVersion();
//const resolveMsgBuffer = new NodeCache();
const { state, saveCreds } = await useMultiFileAuthState("./session");
	const client = makeWASocket({
		printQRInTerminal: !usePairingCode,
		syncFullHistory: true,
		markOnlineOnConnect: true,
		connectTimeoutMs: 60000, 
		defaultQueryTimeoutMs: 0,
		keepAliveIntervalMs: 10000,
		generateHighQualityLinkPreview: true, 
		patchMessageBeforeSending: (message) => {
			const requiresPatch = !!(
				message.buttonsMessage 
				|| message.templateMessage
				|| message.listMessage
			);
			if (requiresPatch) {
				message = {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadataVersion: 2,
								deviceListMetadata: {},
							},
							...message,
						},
					},
				};
			}

			return message;
		},
		version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
		browser: ["Ubuntu", "Chrome", "20.0.04"],
		logger: pino({ level: 'fatal' }),
		auth: { 
			creds: state.creds, 
			keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
				level: 'silent', 
				stream: 'store' 
			})), 
		}
	});

if (usePairingCode && !client.authState.creds.registered) {
            lolcatjs.fromString(`⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄
⠄⠄⠄⣾⣿⠿⠿⠶⠿⢿⣿⣿⣿⣿⣦⣤⣄⢀⡅⢠⣾⣛⡉⠄⠄⠄⠸⢀⣿⠄
⠄⠄⢀⡋⣡⣴⣶⣶⡀⠄⠄⠙⢿⣿⣿⣿⣿⣿⣴⣿⣿⣿⢃⣤⣄⣀⣥⣿⣿⠄
⠄⠄⢸⣇⠻⣿⣿⣿⣧⣀⢀⣠⡌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣿⣿⣿⠄
⠄⢀⢸⣿⣷⣤⣤⣤⣬⣙⣛⢿⣿⣿⣿⣿⣿⣿⡿⣿⣿⡍⠄⠄⢀⣤⣄⠉⠋⣰
⠄⣼⣖⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⢇⣿⣿⡷⠶⠶⢿⣿⣿⠇⢀⣤
⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣷⣶⣥⣴⣿⡗
⢀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄
⢸⣿⣦⣌⣛⣻⣿⣿⣧⠙⠛⠛⡭⠅⠒⠦⠭⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄
⠘⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠹⠈⢋⣽⣿⣿⣿⣿⣵⣾⠃⠄
⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⠄⣴⣿⣶⣄⠄⣴⣶⠄⢀⣾⣿⣿⣿⣿⣿⣿⠃⠄⠄
⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⠄⣿⣿⡀⣾⣿⣿⣿⣿⣛⠛⠁⠄⠄⠄
⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⠁⠞⢿⣿⣿⡄⢿⣿⡇⣸⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠉⠻⣿⣿⣾⣦⡙⠻⣷⣾⣿⠃⠿⠋⠁⠄⠄⠄⠄⠄⢀⣠⣴
⣿⣿⣿⣶⣶⣮⣥⣒⠲⢮⣝⡿⣿⣿⡆⣿⡿⠃⠄⠄⠄⠄⠄⠄⠄⣠⣴⣿⣿⣿`);



    if (useMobile) throw new Error('Cannot use pairing code with mobile API');

      let phoneNumber; 
phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Enter your WhatsApp number\nExample 2541234567:- `)))

        phoneNumber = phoneNumber.trim();
        setTimeout(async () => {
            const code = await client.requestPairingCode(phoneNumber);
      console.log(chalk.black(chalk.bgWhite(`FLUXY PAIR CODE:- ${code}`)));
      }, 3000);
}
console.log(chalk.white.bold(`
${chalk.red("𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍")}
${chalk.blue("𝙁𝙇𝙐𝙓𝙄𝙊𝙉-𝙓𝙈𝘿")}
`));  

store.bind(client.ev);

client.ev.on('messages.upsert', async chatUpdate => {
    try {
        const kay = chatUpdate.messages[0];
        if (!kay.message) return;
        kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message;
        if (kay.key && kay.key.remoteJid === 'status@broadcast') return;
        if (!client.public && !kay.key.fromMe && chatUpdate.type === 'notify') return;
        if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return;
        const messageId = kay.key.id;
        if (processedMessages.has(messageId)) return;
        processedMessages.add(messageId);
        const m = smsg(client, kay, store);
        require('./system')(client, m, chatUpdate, store);
    } catch (err) {
        console.log(err);
    }
})
const processedMessages = new Set();
// Setting
client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    } else {
        return jid;
    }
};

client.ev.on("contacts.update", (update) => {
    for (let contact of update) {
        let id = client.decodeJid(contact.id);
        if (store && store.contacts) {
            store.contacts[id] = { id, name: contact.notify };
        }
    }
});
        client.ev.on('messages.upsert', async chatUpdate => {
        	if (global.autoswview){
            mek = chatUpdate.messages[0]
            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
            	await client.readMessages([mek.key]) }
            	}
            	})
            client.ev.on('messages.upsert', async chatUpdate => {
    const mek = chatUpdate.messages[0];
    if (mek.key && mek.key.remoteJid === "status@broadcast") {
        const emojis = ['🗿', '⌚️', '💠', '👣', '💔', '🤍', '❤️‍🔥', '💣', '🥵', '🦅', '🌻', '🧊', '🛑', '🧸', '👑', '📍', '😅', '🎭', '🎉', '😳', '💯', '🔥', '💫', '🐒', '💗', '❤️‍🔥', '👁️', '👀', '🙌', '🙆', '🌟', '💧', '🦄', '🟢', '🎎', '✅', '🥱', '🌚', '💚', '💕', '😉', '😒'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        try {
            await client.sendMessage("status@broadcast", {
                react: {
                    text: randomEmoji,
                    key: mek.key
                }
            });
            console.log('Status reacted:', randomEmoji);
        } catch (err) {
            console.error('Failed to react to status:', err);
        }
    }
});
client.ev.on('group-participants.update', async (update) => {
if(global.welcome){
  const groupMetadata = await client.groupMetadata(update.id);
  const participants = update.participants;

  for (const participant of participants) {
    let ppUrl;
    try {
      ppUrl = await client.profilePictureUrl(participant, 'image');
    } catch {
      ppUrl = 'https://i.ibb.co/sFjX3nP/default.jpg'; // Fallback image
    }

    const name = (await client.onWhatsApp(participant))[0]?.notify || participant;

    if (update.action === 'add') {
      await client.sendMessage(update.id, {
        image: { url: ppUrl },
        caption: `
  ᎒⊸  𝚆𝚎𝚕𝚌𝚘𝚖𝚎 @${participant.split('@')[0]}  
  ᎒⊸  𝙶𝚛𝚘𝚞𝚙𝙽𝚊𝚖𝚎 :*${groupMetadata.subject}*
  ᎒⊸  𝚃𝚘𝚝𝚊𝚕 𝙼𝚎𝚖𝚋𝚎𝚛𝚜 : ${groupMetadata.participants.length} 
  ᎒⊸  𝙲𝚊𝚞𝚜𝚎 𝚌𝚑𝚊𝚘𝚜 𝚒𝚝𝚜 𝚊𝚕𝚠𝚊𝚢𝚜 𝚏𝚞𝚗
     `,
        mentions: [participant]
      });
    } else if (update.action === 'remove') {
      await client.sendMessage(update.id, {
        image: { url: ppUrl },
        caption: `
  ᎒⊸  𝙲𝚊𝚝𝚌𝚑 𝚞𝚙 𝚕𝚊𝚝𝚎𝚛 @${participant.split('@')[0]}
  ᎒⊸  𝙲𝚘𝚗𝚝𝚒𝚗𝚞𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚒𝚗𝚐 𝚠𝚑𝚊𝚝𝚜𝚊𝚙𝚙
  ᎒⊸  𝙷𝚘𝚙𝚎 𝚠𝚎 𝚖𝚎𝚎𝚝 𝚊𝚐𝚊𝚒𝚗 𝚎𝚡𝚙𝚕𝚘𝚛𝚎𝚛😄
        `,
        mentions: [participant]
      });
    }
  }
}});
    client.ev.on('group-participants.update', async (anu) => {
        if (global.adminevent) {
            console.log(anu)
        let botNumber = await client.decodeJid(client.user.id)
        if (anu.participants.includes(botNumber)) return
        try {
            let metadata = await client.groupMetadata(anu.id)
            let namagc = metadata.subject
            let participants = anu.participants
            for (let num of participants) {
                let check = anu.author !== num && anu.author.length > 1
                let tag = check ? [anu.author, num] : [num]
                try {
                    ppuser = await client.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://telegra.ph/file/de7c8230aff02d7bd1a93.jpg'
                } 
                 if (anu.action == "promote") {
                     client.sendMessage(anu.id, {
                         text: `@${anu.author.split("@")[0]} 𝙷𝚊𝚜 𝚙𝚛𝚘𝚖𝚘𝚝𝚎𝚍 @${num.split("@")[0]} 𝙰𝚜 𝚊𝚍𝚖𝚒𝚗`, 
                         
                     }
                 )
             }
                if (anu.action == "demote") {
                    client.sendMessage(anu.id, {
                        text: `@${anu.author.split("@")[0]} 𝙷𝚊𝚜 𝚍𝚎𝚖𝚘𝚝𝚎𝚍  @${num.split("@")[0]} 𝙰𝚜 𝚊𝚗 𝚊𝚍𝚖𝚒𝚗`, 
                        
                    })
                }
            } 
        } catch (err) {
            console.log(err)
        }
        }
    }
)

    
    
client.getName = (jid, withoutContact = false) => {
    id = client.decodeJid(jid);
    withoutContact = client.withoutContact || withoutContact;
    let v;

    if (id.endsWith("@g.us")) {
        return new Promise(async (resolve) => {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
            resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
        });
    } else {
        v = id === "0@s.whatsapp.net"
            ? { id, name: "WhatsApp" }
            : id === client.decodeJid(client.user.id)
                ? client.user
                : store.contacts[id] || {};
    }

    return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
};

client.public = true;

client.serializeM = (m) => smsg(client, m, store)

client.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await client.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

client.ev.on("connection.update",async  (s) => {
const { connection, lastDisconnect } = s
if (connection == "open") {
lolcatjs.fromString(`FLUXION ACTIVE
┃⭓│ » USERID: ${client.user.id}
┃⭓│ » NAME: ${client.user.name}
└───···`)
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            Wconnect()
        }
    }
)

client.ev.on("creds.update", saveCreds);

client.getFile = async (PATH, returnAsFilename) => {
    let res, filename;
    const data = Buffer.isBuffer(PATH) 
        ? PATH 
        : /^data:.*?\/.*?;base64,/i.test(PATH) 
            ? Buffer.from(PATH.split`,` [1], 'base64') 
            : /^https?:\/\//.test(PATH) 
                ? await (res = await fetch(PATH)).buffer() 
                : fs.existsSync(PATH) 
                    ? (filename = PATH, fs.readFileSync(PATH)) 
                    : typeof PATH === 'string' 
                        ? PATH 
                        : Buffer.alloc(0);

    if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer');

    const type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
    };

    if (data && returnAsFilename && !filename) {
        filename = path.join(__dirname, './tmp/' + new Date * 1 + '.' + type.ext);
        await fs.promises.writeFile(filename, data);
    }

    return {
        res,
        filename,
        ...type,
        data,
        deleteFile() {
            return filename && fs.promises.unlink(filename);
        }
    };
};

client.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
}

client.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
    let type = await client.getFile(path, true);
    let { res, data: file, filename: pathFile } = type;

    if (res && res.status !== 200 || file.length <= 65536) {
        try {
            throw { json: JSON.parse(file.toString()) };
        } catch (e) {
            if (e.json) throw e.json;
        }
    }

    let opt = { filename };
    if (quoted) opt.quoted = quoted;
    if (!type) options.asDocument = true;

    let mtype = '', mimetype = type.mime, convert;

    if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) {
        mtype = 'sticker';
    } else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) {
        mtype = 'image';
    } else if (/video/.test(type.mime)) {
        mtype = 'video';
    } else if (/audio/.test(type.mime)) {
        convert = await (ptt ? toPTT : toAudio)(file, type.ext);
        file = convert.data;
        pathFile = convert.filename;
        mtype = 'audio';
        mimetype = 'audio/ogg; codecs=opus';
    } else {
        mtype = 'document';
    }

    if (options.asDocument) mtype = 'document';

    let message = {
        ...options,
        caption,
        ptt,
        [mtype]: { url: pathFile },
        mimetype
    };

    let m;
    try {
        m = await client.sendMessage(jid, message, { ...opt, ...options });
    } catch (e) {
        console.error(e);
        m = null;
    } finally {
        if (!m) m = await client.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
        return m;
    }
}

client.sendTextWithMentions = async (jid, text, quoted, options = {}) => {
    client.sendMessage(jid, {
        text: text,
        contextInfo: {
            mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
        },
        ...options
    }, { quoted });
};

client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) 
        ? path 
        : /^data:.*?\/.*?;base64,/i.test(path) 
            ? Buffer.from(path.split`,`[1], 'base64') 
            : /^https?:\/\//.test(path) 
                ? await (await getBuffer(path)) 
                : fs.existsSync(path) 
                    ? fs.readFileSync(path) 
                    : Buffer.alloc(0);

    let buffer;
    if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options);
    } else {
        buffer = await videoToWebp(buff);
    }

    await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
    return buffer;
};


client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename;
    await fs.writeFileSync(trueFileName, buffer);
    
    return trueFileName;
};
 
const path = require('path');

client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename;
    let savePath = path.join(__dirname, 'tmp', trueFileName); // Save to 'tmp' folder
    await fs.writeFileSync(savePath, buffer);
    return savePath;
};
client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

client.sendImage = async (e, t, a = "", s = "", f) => {
    let r = Buffer.isBuffer(t)
      ? t
      : /^data:.*?\/.*?;base64,/i.test(t)
      ? Buffer.from(t.split`,`[1], "base64")
      : /^https?:\/\//.test(t)
      ? await await getBuffer(t)
      : fs.existsSync(t)
      ? fs.readFileSync(t)
      : Buffer.alloc(0);
    return await client.sendMessage(
      e,
      { image: r, caption: a, ...f },
      { quoted: s }
    );
  };
  
client.sendText = (jid, text, quoted = '', options) => client.sendMessage(jid, { text: text, ...options }, { quoted })

client.sendTextWithMentions = async (jid, text, quoted, options = {}) => client.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
return client;
}

Wconnect();

//batas
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})