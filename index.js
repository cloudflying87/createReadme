const fs = require('fs');
const util = require('util')
const inquirer = require('inquirer');
const generate = require('./Utility/generateMarkdown');
let data

const writeFileAsync = util.promisify(fs.writeFile)
// array of questions for user
inquirer
.prompt([
    {
        type: 'input',
        name: 'username',
        message: 'What is GitHub username?',
    },    
    {
        type: 'input',
        name: 'title',
        message: 'What is the Title of your Project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please include a description of your project',
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Installation Instructions?',
        default: 'npm install _'
      },
      {
        type: 'list',
        name: 'license',
        message: 'What license do you want to use?',
        choices: ['mit','afl-3.0', 'apache-2.0','gpl','wtfpl','unlicense'],
        
      },
      {
        type: 'input',
        name: 'contribute',
        message: 'What is needed to contribute to this project?',
      },
      {
        type: 'input',
        name: 'tests',
        message: 'What test cases should be included?',
      },
      {
        type: 'input',
        name: 'questions',
        message: 'Frequently Asked Questions',
      },
    ])
    .then(answers => {
        writeFileAsync('test.md',generate.generateMarkdown(answers))
    })
    .catch(console.error)