const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "Le ping du bot",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Informations",

    async run(bot, interaction) {
        await interaction.reply({content: `Ping : \`${bot.ws.ping}\``, ephemeral: true})
    }
}