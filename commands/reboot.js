exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	await message.channel.send("Bot is shutting down.");
	await Promise.all(client.container.commands.map(cmd => {
		// the path is relative to the *current folder*, so just ./filename.js
		delete require.cache[require.resolve(`./${cmd.help.name}.js`)];
		// We also need to delete and reload the command from the container.commands Enmap
		client.container.commands.delete(cmd.help.name);
	}));
	process.exit(0);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["restart"],
	permLevel: "Bot Admin"
};

exports.help = {
	name: "reboot",
	category: "System",
	description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
	usage: "reboot"
};
