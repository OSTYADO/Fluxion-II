
const chalk = require("chalk")
const lolcatjs = require('lolcatjs')
const Connecting = async ({
  update,
  client,
  Boom,
  DisconnectReason,
  sleep,
  color,
  Wconnect,
}) => {   
     const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log(chalk.red.bold(lastDisconnect.error));
            if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
                process.exit();
            } else if (reason === DisconnectReason.badSession) {
                console.log(chalk.red.bold(`bad session file, please delete session and scan again`));
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.red.bold('connection closed, reconnecting...'));
                process.exit();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.red.bold('connection lost, trying to reconnect'));
                process.exit();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(chalk.red.bold('connection replaced, another new session opened, please close current session first'));
                client.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red.bold(`device logged out, please scan again and run.`));
                client.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.yellow.bold('restart required,restarting...'));
                await Wconnect();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.yellow.bold('connection timedOut, reconnecting...'));
                Wconnect();
            }
        } else if (connection === "connecting") {
            console.log(chalk.blue.bold('Connecting. . .'));
        } else if (connection === "open") {

            
            console.log(chalk.white.bold(`
${chalk.red("𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍")}
${chalk.blue("𝙁𝙇𝙐𝙓𝙄𝙊𝙉-𝙓𝙈𝘿")}
`));  
        }}
 
 module.exports = { Connecting };