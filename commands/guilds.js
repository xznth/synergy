const Discord = require("discord.js");
const errors = require("../lib/errors.js");

module.exports.run = async (bot, message, args) => {

bot.guilds.forEach(guild=>{
	message.channel.send(guild.name);
})
}

module.exports.help = {
  name: "guilds",
  desc: "Lists all guilds. Developer command.",
  class: "dev"
}
