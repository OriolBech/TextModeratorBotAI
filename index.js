require('dotenv').config();
const fetch = require('node-fetch');

var Discord = require('discord.js');
var bot = new Discord.Client();
var TOKEN = process.env.TOKEN;
var KEY = process.env.KEY;



//post options
const options = {
  hostname: 'https://westeurope.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?classify=True',
  method: 'POST',
  headers: {
      'content-type': 'text/plain',
      'Ocp-Apim-Subscription-Key': 'c0ac983e40904019ac97de57dde4a6a9'
  }
  ,
  params: {
    'classify':'True'
  }
};


//bot login
bot.login(TOKEN);

//start discord bot
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

async function getReview() {

}

//scan messages from discord
bot.on("message", msg => {
  var review;
  //send json data
  async function getReview() {
    var response = await fetch('https://westeurope.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?classify=True', { 
      method: 'post',
      body:    msg,
      headers: { 'Content-Type': 'text/plain', 'Ocp-Apim-Subscription-Key': KEY },
    }).then(res => res.json()).then(body => this.review = body['Classification']['ReviewRecommended']);
    return response;
  }
  review = getReview();
  console.log(review);
});