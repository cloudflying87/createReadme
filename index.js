const fs = require('fs');
const util = require('util')
const inquirer = require('inquirer');
const generate = require('./Utility/generateMarkdown');
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
        name: 'email',
        message: 'What is your email? (Used for ask questions)',
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
        type: 'confirm',
        name: 'tableofcontents',
        message: 'Do you want a table of contents?',
        default: false
      },
      {
        type: 'checkbox',
        name: 'tocitems',
        message: 'What items would you like on your table of contents?',
        choices: [
          {name:'Installation'},
          {name: 'Usage'},
          {name:'License'},
          {name:'Contributing'},
          {name:'Tests'}
          ],
          when: (answers) => {
            return answers.tableofcontents == true
          }
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Installation Instructions?',
        default: 'npm install _',
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('Installation')){
            return true
          }
        },
      },
      {
        type: 'input',
        name: 'usage',
        message: 'The designed usage of this project',
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('Usage')){
            return true
          }}
      },
      {
        type: 'list',
        name: 'license',
        message: 'What license do you want to use?',
        choices: ['mit', 'apache-2.0','MPL 2.0','unlicense'],
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('License')){
            return true
          }}
      },
      {
        type: 'input',
        name: 'contribute',
        message: 'What is needed to contribute to this project?',
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('Contributing')){
            return true
          }}
      },
      {
        type: 'input',
        name: 'tests',
        message: 'What test cases should be included?',
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('Tests')){
            return true
          }}
      },
    ])
    .then(answers => {
        // switch(answers.license){
        //     case ['mit']:
        //         badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        //         break;
        //     case 'unlicense':
        //         badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
        //     default:
        //         badge = 'No license picked'
        //         console.log(answers.license)
        // }
        if (answers.license == 'mit'){
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
        }
        if (answers.license == 'unlicense'){
            badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
        }
        if (answers.license == 'apache-2.0'){
            badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
        }
        if (answers.license == 'mpl-2.0'){
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
        }
        console.log(answers.tocitems[0])
        writeFileAsync('test.md',generate.generateMarkdown(answers))
    })
    .catch(console.error)