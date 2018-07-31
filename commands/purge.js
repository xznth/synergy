const Discord = require("discord.js");
const errors = require("../lib/errors.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[1]) return message.channel.send("Please include an amount of messages to delete");
  var amt = args[1];
  if(args[1] > 100) amt = 100;
  message.channel.bulkDelete(amt).then(() => {
    message.channel.send(`Cleared ${amt} messages.`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "purge",
  desc: "Purges a specified number of messages from the current channel. Max: 100",
  class: "admin"
}