// EVERY LINE THAT IS COMMENTED YOU CAN MODIFY IT OR CHANGE THE CODE AS YOU WISH
const Discord = require("discord.js")
const config = require("../config")

module.exports = async(bot, interaction) => {

    if (interaction.isButton()) {
        if (interaction.customId === "button_start_application") {
            const selectListApplication = new Discord.ActionRowBuilder()
                .addComponents(new Discord.StringSelectMenuBuilder()
                    .setCustomId(`select_list_application`)
                    .setPlaceholder("Select the role that you wish") // You can change this exemple as you wish
                    .addOptions(
                        // For the options you can add 25 options MAXIMUM, take the first line as an exemple for the other ones
                        { emoji: '🛠', label: 'Moderator', value: '1' }
                    )
                )
            interaction.reply({components: [selectListApplication], ephemeral: true})
        }
        if (interaction.customId === "accepted_application") {
            const acceptedUserModalDisplay = new Discord.ModalBuilder()
                .setCustomId(`modal_accepted_user`)
                .setTitle("User Accepted")
            
            const acceptedUserIDInput = new Discord.TextInputBuilder()
                .setCustomId(`modal_accepted_userIDInput`)
                .setLabel("What is the ID of the user ?")
                .setPlaceholder("Exemple : 812289522690818109")
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short)
            
            const acceptedDateInput = new Discord.TextInputBuilder()
                .setCustomId(`modal_accepted_dateInput`)
                .setLabel("Give the user a date for a Discord call !")
                .setPlaceholder("Exemple : 05/25/2024")
                .setRequired(false)
                .setStyle(Discord.TextInputStyle.Short)

            const modalUserID = new Discord.ActionRowBuilder().addComponents(acceptedUserIDInput)
            const modalDate = new Discord.ActionRowBuilder().addComponents(acceptedDateInput)

            acceptedUserModalDisplay.addComponents(modalUserID, modalDate)

            await interaction.showModal(acceptedUserModalDisplay)
        }
        if (interaction.customId === "denied_application") {
            const deniedUserModalDisplay = new Discord.ModalBuilder()
                .setCustomId(`modal_denied_user`)
                .setTitle("User denied")
            
            const deniedUserIDInput = new Discord.TextInputBuilder()
                .setCustomId(`modal_denied_userIDInput`)
                .setLabel("What is the ID of the user ?")
                .setPlaceholder("Exemple : 812289522690818109")
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short)
            
            const deniedReasonInput = new Discord.TextInputBuilder()
                .setCustomId(`modal_denied_reason`)
                .setLabel("Give the user a reason !")
                .setPlaceholder("Exemple : your application was weak")
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short)

            const modalUserID = new Discord.ActionRowBuilder().addComponents(deniedUserIDInput)
            const modalReason = new Discord.ActionRowBuilder().addComponents(deniedReasonInput)

            deniedUserModalDisplay.addComponents(modalUserID, modalReason)

            await interaction.showModal(deniedUserModalDisplay)
        }
    }



    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === "select_list_application") {
            if (interaction.values && interaction.values.length > 0) {
                let applicationSelected = parseInt(interaction.values[0])

                // For the next condition is an exemple for you, so you can use it for others application !
                if (applicationSelected === 1) {
                    const applicationModeratorModalDisplay = new Discord.ModalBuilder()
                        .setCustomId(`application_moderator_modal`)
                        .setTitle("Application Moderator")
                    
                    const applicationNameModalInput = new Discord.TextInputBuilder()
                        .setCustomId(`application_moderator_nameInput`)
                        // Every line with a question and exemple as this one, you can change it as you wish for your server
                        .setLabel("What is your name ?")
                        .setPlaceholder("Exemple : Jordan")
                        .setRequired(true)
                        .setStyle(Discord.TextInputStyle.Short)
                    
                    const applicationAgeModalInput = new Discord.TextInputBuilder()
                        .setCustomId(`application_moderator_ageInput`)
                        // Every line with a question and exemple as this one, you can change it as you wish for your server
                        .setLabel("What is your age ?")
                        .setPlaceholder("Exemple : 25 years old")
                        .setRequired(true)
                        .setStyle(Discord.TextInputStyle.Short)

                    const applicationKnowledgeModalInput = new Discord.TextInputBuilder()
                        .setCustomId(`application_moderator_knowledgeInput`)
                        // Every line with a question and exemple as this one, you can change it as you wish for your server
                        .setLabel("What do you know as a moderator ?")
                        .setPlaceholder("Exemple : I know how to mute ban")
                        .setRequired(true)
                        .setStyle(Discord.TextInputStyle.Paragraph)
                    
                    const applicationWantingModalInput = new Discord.TextInputBuilder()
                        .setCustomId(`application_moderator_wantingInput`)
                        // Every line with a question and exemple as this one, you can change it as you wish for your server
                        .setLabel("Why do you want join our staff team ?")
                        .setPlaceholder("Exemple : Because I like the server !")
                        .setRequired(true)
                        .setStyle(Discord.TextInputStyle.Paragraph)

                    const applicationActivityModalInput = new Discord.TextInputBuilder()
                        .setCustomId(`application_moderator_activityInput`)
                        // Every line with a question and exemple as this one, you can change it as you wish for your server
                        .setLabel("How many days a week can you be on discord ?")
                        .setPlaceholder("Exemple : 4/7")
                        .setRequired(true)
                        .setStyle(Discord.TextInputStyle.Short)

                    const modalName = new Discord.ActionRowBuilder().addComponents(applicationNameModalInput)
                    const modalAge = new Discord.ActionRowBuilder().addComponents(applicationAgeModalInput)
                    const modalKnowledge = new Discord.ActionRowBuilder().addComponents(applicationKnowledgeModalInput)
                    const modalWanting = new Discord.ActionRowBuilder().addComponents(applicationWantingModalInput)
                    const modalActivity = new Discord.ActionRowBuilder().addComponents(applicationActivityModalInput)

                    applicationModeratorModalDisplay.addComponents(modalName, modalAge, modalKnowledge, modalWanting, modalActivity)

                    await interaction.showModal(applicationModeratorModalDisplay)
                }
            }
        }
    }



    if (interaction.isModalSubmit()) {
        if (interaction.customId === "application_moderator_modal") {
            const nameContent = interaction.fields.getTextInputValue("application_moderator_nameInput")
            const ageContent = interaction.fields.getTextInputValue("application_moderator_ageInput")
            const knowledgeContent = interaction.fields.getTextInputValue("application_moderator_knowledgeInput")
            const wantingContent = interaction.fields.getTextInputValue("application_moderator_wantingInput")
            const activityContent = interaction.fields.getTextInputValue("application_moderator_activityInput")

            const displayApplicationToStaff = new Discord.EmbedBuilder()
                .setColor(config.mainServerColor)
                .setDescription(`**🛠 Application for Moderator from ${interaction.user.username} (\`${interaction.user.id}\`)**`)
                .setTimestamp()
                // If you want to enable the image settings for more customization
                // .setImage("")

                displayApplicationToStaff.addFields(
                    { name: 'What is your name ?', value: `${nameContent}\n`, inline: false },
                    { name: 'What is your age ?', value: `${ageContent}\n`, inline: false },
                    { name: 'What do you know as a moderator ?', value: `${knowledgeContent}\n`, inline: false }
                )
                displayApplicationToStaff.addFields(
                    { name: 'Why do you want join our staff team ?', value: `${wantingContent}\n`, inline: false },
                    { name: 'How many days a week can you be on discord ?', value: `${activityContent}`, inline: false }
                )

            const buttonToAcceptOrRefuse = new Discord.ActionRowBuilder()
                .addComponents(new Discord.ButtonBuilder()
                    .setCustomId(`accepted_application`)
                    .setEmoji('✅')
                    .setLabel('Accept')
                    .setDisabled(false)
                    .setStyle(Discord.ButtonStyle.Secondary)
                )
                .addComponents(new Discord.ButtonBuilder()
                    .setCustomId(`denied_application`)
                    .setEmoji('⛔')
                    .setLabel('Deny')
                    .setDisabled(false)
                    .setStyle(Discord.ButtonStyle.Secondary)
                )

            await interaction.update({content: "Your application has been sended please check your DM !", ephemeral: true})
            await bot.channels.cache.get(config.applicationReceptionChannel).send({embeds: [displayApplicationToStaff], components: [buttonToAcceptOrRefuse]})
        }
        if (interaction.customId === "modal_accepted_user") {
            const userIDContent = interaction.fields.getTextInputValue("modal_accepted_userIDInput")
            const dateContent = interaction.fields.getTextInputValue("modal_accepted_dateInput")
            const user = bot.users.cache.get(userIDContent)

            if (dateContent === " ") {
                dateContent = "No date has been given please contact a staff member"
            }

            const messageDisplayToStaff = `✅ The user ${user} has been accepted by ${interaction.user}, here is the date for the discord call \`${dateContent}\``
            const embedAcceptedApplication = new Discord.EmbedBuilder()
                .setColor(config.mainServerColor)
                .setDescription(`# ✅ Application Accepted\n\nYour application has been accepted ! The staff member gave you a date for a discord call \`${dateContent}\``)
                // You can uncomment those settings for more customization
                // .setImage("")
                // .setTimestamp()
            
            interaction.update({content: `${messageDisplayToStaff}`, components: []})

            try {await user.send({content: `${user}`, embeds: [embedAcceptedApplication]})} catch (error) {}
        }
        if (interaction.customId === "modal_denied_user") {
            const userIDContent = interaction.fields.getTextInputValue("modal_denied_userIDInput")
            const reasonContent = interaction.fields.getTextInputValue("modal_denied_reason")
            const user = bot.users.cache.get(userIDContent)

            if (reasonContent === " ") {
                reasonContent = "No reason has been given please contact a staff member"
            }

            const messageDisplayToStaff = `⛔ The user ${user} has been denied by ${interaction.user}, here is the reason : \`${reasonContent}\``
            const embedDeniedApplication = new Discord.EmbedBuilder()
                .setColor(config.mainServerColor)
                .setDescription(`# ⛔ Application Denied\n\nYour application has been denied ! The staff member gave you a reason :\n\n \`${reasonContent}\``)
                // You can uncomment those settings for more customization
                // .setImage("")
                // .setTimestamp()
            
            interaction.update({content: `${messageDisplayToStaff}`, components: []})

            try {await user.send({content: `${user}`, embeds: [embedDeniedApplication]})} catch (error) {}
        }
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../commands/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options)
    }
}