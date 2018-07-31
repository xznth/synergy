const Discord = require("discord.js");
const errors = require("../lib/errors.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    if(kUser.hasPermission("KICK_MEMBERS")) return errors.equalPerms(message, kUser, "KICK_MEMBERS");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("KICK REPORT")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Please ensure your server has a #incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  module.exports.help = {
  name: "kick",
  desc: "Allows admins to kick a user.",
  class: "admin"
}