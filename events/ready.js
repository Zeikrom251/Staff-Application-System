const loadSlashCommand = require("../loaders/loadSlashCommand")

module.exports = async bot => {
    await loadSlashCommand(bot)
    console.log(`${bot.user.tag} is now ON !`)
}