const Discord = require("discord.js");
const errors = require("../lib/errors.js");
let config = require("../config.json");
let lodash = require("lodash");
const fs = require("fs");

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

function compareclass(a,b) {
  if (a.class < b.class)
    return -1;
  if (a.class > b.class)
    return 1;
  return 0;
}

module.exports.run = async (bot, message, args, files) => {
var list = [];

fs.readdir("./commands/", (err, files) => {
if(err) console.log(err);
let jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0){
console.log("Error indexing commands.");
return;
}

jsfile.forEach((f, i) =>{
let props = require(`./${f}`);
list.push(props.help);
})
list.sort(compareclass);
	let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()

botembed.setColor(config.purple)
botembed.setThumbnail(bicon)
for (var i = 0, len = list.length; i < len; i++) {
	if (list[i].class == "dev") i++;
botembed.addField(`.${list[i].name}`,`${list[i].desc}`);
}
message.channel.send(botembed);
return;
});
}


module.exports.help = {
  name: "help",
  desc: "General help command, opens this menu",
  class: "utility"
}