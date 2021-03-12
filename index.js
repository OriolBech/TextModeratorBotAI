require('dotenv').config();
let fetch = require('node-fetch');

let Discord = require('discord.js');
let bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const KEY = process.env.KEY;

//bot login
bot.login(TOKEN);

//start discord bot
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

//scan messages from discord
bot.on("message", msg => {
  //send json data
  let getReview = function(data) {
    return fetch('https://westeurope.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?classify=True', { 
      method: 'post',
      body:    data,
      headers: { 'Content-Type': 'text/plain', 'Ocp-Apim-Subscription-Key': KEY },
    }).then(body => { return body.json() } )
  }
  
  let checkReview = getReview(msg);
  
  checkReview.then(function(result) {
    if(result.hasOwnProperty('Classification')){
      if (result['Classification']['ReviewRecommended'] == true) {
        msg.delete().then(msg => msg.reply(`Deleted message by ModeratorBot, possibly for be offensive`))
      }
    }
  })
});