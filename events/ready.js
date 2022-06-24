const logger = require("../modules/Logger.js");
const { prefix } = require("../config");
module.exports = async client => {
    // Log that the bot is online.
    logger.log(`${client.user.tag}, ready to serve ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users in ${client.guilds.cache.size} servers.`, "ready");
  
    // Make the bot "play the game" which is the help command with default prefix.
    client.user.setActivity(`${prefix}help`, { type: "PLAYING" });
};
