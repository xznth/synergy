const Discord = require("discord.js");
var xkcd = require('xkcd');
const PREFIX = ".";

module.exports.run = (bot, message, args) => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    if (!args[1])
        var index = Math.floor(Math.random() * 2025)
    if (args[1])
        var index = args[1]

    console.log(index)
    xkcd(index, function (data) {
    let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
    var embed = new Discord.RichEmbed()
    .setColor(`#${randomcolor}`)
    .setImage(data['img'])
    message.channel.send(embed);
})}

module.exports.help = {
    name: "xkcd",
  desc: "Returns a random xkcd strip, or a specific strip if specified.",
  class: "fun"
}