const fs = require('fs');
const util = require('util')
var inquirer = require('inquirer')
// var generate = require('./Utility/generateMarkdown');
// const generateMarkdown = require("./Utility/generateMarkdown");

const appendFileAsync = util.promisify(fs.appendFile)
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
        return `# ${data.title}
  
        `;
        
      })
// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile("test.md", answers.title, function(err) {
        if (err) {
          console.log(err);
        }
      });

}
// function to initialize program

function init(){

// function call to initialize program
}
