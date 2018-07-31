require('dotenv').config({path: "variables.env"});
require('isomorphic-fetch');
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const http = require('http').createServer().listen(3000)
var date = new Date();

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} OK\n`);
    bot.commands.set(props.help.name, props);
  });
});

let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const PREFIX = config["prefix"]

bot.on("ready", async () => {
  console.log(`${date.getTime()}\n${bot.user.username} ${bot.user.id}\nONLINE ON ${bot.guilds.size} GUILDS`);
  bot.user.setActivity(`Online on ${bot.guilds.size} servers!`)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

bot.login(process.env.TOKEN)