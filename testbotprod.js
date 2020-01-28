/**
 * A Discord bot for pokemon TCG
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

//pokemonTCG
const pokemon = require('pokemontcgsdk')
var standardSets = [];
var standardSetsOrd = '';
function addStandardSet(item) {
	standardSets.push(item.name);
	standardSetsOrd = standardSetsOrd.concat(item.name, '|');
}

pokemon.set.where({standardLegal: true})
.then(result => {
	result.forEach(addStandardSet);
    console.log(standardSets) // "Charizard"
})

// Create an event listener for messages
client.on('message', message => {

  if (message.content.substring(0,3) == "]] ") {
	  var pokemonName = message.content.substring(3);
	  
	  pokemonName = pokemonName.toLowerCase();
	  pokemonName = pokemonName.replace(' prism', ' ◇');
	  pokemonName = pokemonName.replace(' gx', '-gx');
	  if(pokemonName.toLowerCase() == 'pizza'){
		  message.channel.send({embed:{
			  author: {
				  name: 'totinotoki',
				  icon_url: 'https://cdn.discordapp.com/attachments/279340703883198465/662599339641929768/totino.png'
			  },
			  description: ' i hungree for pizza',
			  image: {
				  url: 'https://cdn.discordapp.com/attachments/591370235119009847/661271676440281088/image0.png'
			  }
		  }});
	  }
	  else if(pokemonName == 'ur mom') {
		  message.channel.send({embed:{ 
			author: {
				name:'ur mom',
				icon_url: 'https://pbs.twimg.com/media/C0FbKY2WEAEC6DP.jpg'
			},
			description: 'go do ur work',
			image: {
				url: 'https://cdn.bulbagarden.net/upload/0/0e/MomKindnessMajesticDawn83.jpg'
			}
		  }});
	  }
	  else if(pokemonName == 'momott') {
		  message.channel.send('https://media1.tenor.com/images/1f229ea5fab606289ccdd3f46a324a77/tenor.gif?itemid=9375002');
	  }
	  else if(pokemonName == 'momowow') {
		  message.channel.send('https://i.gifer.com/AEvf.gif');
	  }
	  else {
		  
		message.channel.send('*Maractus!*');
		
		
		
		pokemon.card.all({ name: '\"'+pokemonName+'\"', pageSize: 1, set: standardSetsOrd.slice(0,-1)})
			.on('data', card => {
				message.channel.send({embed: {
					color: 3322898,
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL
					},
					description: '**Set:** ' + card.set + '\n**Rarity:** ' + card.rarity,
					image: {
						url: card.imageUrl
					}
				}});
			})
		
	  }
  }
});


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('CODE HERE');
