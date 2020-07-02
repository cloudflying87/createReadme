// function to generate markdown for README
module.exports = {
  generateMarkdown: function(data){
  return `# ${data.title}

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
${badge}

## Contributing 
${data.contribute}

## Tests
${data.tests}

## Questions
[GitHub Profile](https://github.com/${data.username})

[Email me with Questions](mailto:${data.email})

  `
}}
