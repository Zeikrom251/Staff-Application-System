const Discord = require("discord.js")
const config = require("../config")
const { ButtonBuilder } = require("@discordjs/builders")

module.exports = {
    name: "application",
    description: "Display the application embed",
    permission: Discord.PermissionFlagsBits.Administrator,

    async run(bot, interaction) {
        const embedApplicationDisplay = new Discord.EmbedBuilder()
            .setColor(config.mainServerColor)
            .setDescription("# 📜 Staff Application\n\n\n") // Add any description you want
            .setFooter({text: "Made by Zeikrom"})
            // You can uncomment the next settings for more embed customization
            // .setImage("")
        
        const buttonApplication = new Discord.ActionRowBuilder()
            .addComponents(new Discord.ButtonBuilder()
                .setCustomId(`button_start_application`)
                .setEmoji("📜")
                .setLabel("Application")
                .setDisabled(false)
                .setStyle(Discord.ButtonStyle.Secondary)
            )
        
        await interaction.reply({content: "The embed for the applications has successfully been sended !", ephemeral: true})
        await bot.channels.cache.get(config.applicationEmbedDisplay).send({embeds: [embedApplicationDisplay], components: [buttonApplication]})    
    }
}