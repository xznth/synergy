const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
		message.channel.send("Pong!");
	}

module.exports.help = {
	name: "ping",
  	desc: "Simple latency check message. Or, play a text-based game of pong!",
	class: "utility"
}