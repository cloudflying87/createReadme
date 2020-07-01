// function to generate markdown for README
module.exports = {
  generateMarkdown: function(data){
  return `# ${data.title}
Created by: ${data.username}

## Description
${data.description}

## Table of Contents

*[Installation](#installation)${'\n'}
*[Usage](#usage)${'\n'}
*[License](#license)${'\n'}
*[Contributing](#contributing)${'\n'}
*[Tests](#tests)${'\n'}
*[Questions](#questions)${'\n'}

## Installation
${data.installation}

## Usage
${data.usage}

## License
${data.license}

## Contributing 
${data.contribute}

## Tests
${data.tests}

## Questions
${data.questions}
  `
}}
