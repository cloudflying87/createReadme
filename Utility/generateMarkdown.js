// function to generate markdown for README
module.exports = {
  generateMarkdown: function(data){
  return `# ${data.title}

## Description
${data.description}

  `
}}
