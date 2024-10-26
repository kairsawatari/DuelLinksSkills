const {Events} = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute(message) {
      if (message.content.startsWith('[') && message.content.endsWith(']')) {
        const searchTerm = message.content.substring(1, message.content.length - 1);
        const skills = require('./skills.json');

        let foundSkill = null;
            let minDistance = Infinity;

            for (const skill of skills) {
                const distance = levenshteinDistance(skill.name.toLowerCase(), searchTerm.toLowerCase());
                
                // Check if this distance is less than the current minimum distance
                if (distance < minDistance) {
                    minDistance = distance;
                    foundSkill = skill;
                }
            }

            // Set a threshold for what constitutes a "close enough" match
            const threshold = 5; // You can adjust this value based on your needs

            if (minDistance <= threshold) {
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
    },
  }

function levenshteinDistance(a, b) {
  const matrix = [];

  // Create an empty matrix
  for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
              matrix[i][j] = matrix[i - 1][j - 1]; 
          } else {
              matrix[i][j] = Math.min(
                  matrix[i - 1][j - 1] + 1,
                  matrix[i][j - 1] + 1,     
                  matrix[i - 1][j] + 1      
              );
          }
      }
  }

  return matrix[b.length][a.length];
}
