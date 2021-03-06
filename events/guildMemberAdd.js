const { MessageEmbed } = require("discord.js");
const guildSettings = require("../models/guildSettings");

module.exports = async (client, guildMember) => {
	const guildID = guildMember.guild.id;
	const settings = await guildSettings.findOne({ guildID: guildID });
	const logEnabled = settings.logs.GUILD_MEMBER_ADD.enabled;
	const logChannelID = settings.logs.GUILD_MEMBER_ADD.logChannelID;
	if (!logEnabled || !logChannelID) return;

	const user = `${guildMember.user.tag} (${guildMember.user.id})`;
	const createdAt = guildMember.user.createdAt;
	
	const logEmbed = new MessageEmbed()
		.setColor("#FFA700")
		.setTitle("User Joined")
		.setDescription(`**User:** ${user}\n**Account Created At:** ${createdAt}`)
		.setThumbnail(guildMember.user.avatarURL())
		.setTimestamp();
	client.channels.cache.get(logChannelID).send({ embeds: [ logEmbed ]});
    
};
