const {Events} = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute(message) {
      if (message.content.startsWith('[') && message.content.endsWith(']')) {
        const searchTerm = message.content.substring(1, message.content.length - 1);
        const skills = require('./skills.json'); // assuming your JSON file is named skills.json
  
        let foundSkill = null;
        for (const skill of skills) {
          if (skill.name.toLowerCase() === searchTerm.toLowerCase()) {
            foundSkill = skill;
            break;
          }
        }
  
        if (foundSkill) { 
            message.reply(`
                # Skill Name:
                ${foundSkill.name}
                
                # Skill Description:
                ${foundSkill.desc}
                
                ## Characters:
                ${foundSkill.chars}
                `);
        } else {
          message.reply('No matching skill found');
        }
      }

      if (message.content === '!madolche') {
        message.reply('Bow to the Queen!');
      }
      if (message.content === '$kitedrake') {
        message.reply('BAN KITEDRAKE IMMEDIATELY');
      }
      if (message.content === '$orgoth') {
        message.reply('Tier 0, best deck, our lord and savior');
      }
    },
  }