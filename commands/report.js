const Discord = require("discord.js");
const config = require("../config.json");
const red = config.red;
const green = config.green;
const orange = config.orange;
const errors = require("../lib/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(args[1] == "help"){
      message.reply("Usage: .report <user> <reason>");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor(orange)
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Please ensure your server has a #reports channel.");
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report",
  desc: "Reports a user to admins.",
  class: "utility"
}