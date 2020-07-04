const fs = require('fs');
const util = require('util')
const inquirer = require('inquirer');
// const generate = require('./Utility/generateMarkdown');
const writeFileAsync = util.promisify(fs.writeFile)
const appendFileAsync = util.promisify(fs.appendFile)

// array of questions for user
let answerGlobal = ''
function promptUser() {
return inquirer.prompt([
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
        name: 'Installation',
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
        name: 'Usage',
        message: 'The designed usage of this project',
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('Usage')){
            return true
          }}
      },
      {
        type: 'list',
        name: 'License',
        message: 'What license do you want to use?',
        choices: ['mit', 'apache-2.0','MPL 2.0','unlicense'],
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('License')){
            return true
          }}
      },
      {
        type: 'input',
        name: 'Contributing',
        message: 'Contribution guidelines',
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('Contributing')){
            return true
          }}
      },
      {
        type: 'input',
        name: 'Tests',
        message: 'Test instructions',
        when: (answers) => {
          if (answers.tableofcontents ==true && answers.tocitems.includes('Tests')){
            return true
          }}
      },
    ])
  }

let writeString =''
promptUser()  
    .then(answers => {
      answerGlobal = answers
      generateHeader(answerGlobal);
      writeFileAsync('test.md',writeString);
      generateTOC(answerGlobal);
      generateTOCItems(answers);
      writeData(answers);
      appendFileAsync('test.md',questionBlock(answers));
    })
    .catch(console.error)


function generateHeader(data) {
  if (data.tableofcontents ==true && data.tocitems.includes('License')){
    badgeGet(data)
  }
writeString = `
# ${data.title}
${badge}
## Description
${data.description}
      `
//       return `
// # ${data.title}
// ${badge}
// ## Description
// ${data.description}
//       `
}

function generateTOC(data) {
 if (data.tableofcontents) {
   appendFileAsync('test.md','\n'+`## Table of Contents`)
 }
}

function generateTOCItems(data) {
let tocContents = data.tocitems
if (data.tableofcontents == true){
  const tocLength = tocContents.length 
  for (let i = 0; i < tocLength; i++) {
      appendFileAsync('test.md','\n\n'+`*[${data.tocitems[i]}](#${data.tocitems[i]})`)
}}
}

function writeData(data){
  if (data.tableofcontents == true){
    let tocContents = data.tocitems
    let content = ''
    for (let i = 0; i < tocContents.length; i++) {
      badge = ''
      if (data.tocitems[i] == 'Installation' ){
        content = data.Installation
      } else if (data.tocitems[i] == "License"){
        content = data.License
      } else if (data.tocitems[i] == "Contributing"){
        content = data.Contributing
      } else if (data.tocitems[i] == "Usage"){
        content = data.Usage
      } else if (data.tocitems[i] == "Tests"){
        content = data.Tests
      }
      appendFileAsync('test.md','\n\n'+`## ${data.tocitems[i]}\n\n${content}`)
    }
  }
}

function questionBlock(data){
  return `
\n\n## Questions
[GitHub Profile](https://github.com/${data.username})

[Email me with Questions](mailto:${data.email})`
}

let badge = ''
function badgeGet(data){
    if (data.License == 'mit'){
      badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
  }
   if (data.License == 'unlicense'){
      badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
  }
    if (data.License == 'apache-2.0'){
      badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
  }
    if (data.License == 'mpl-2.0'){
      badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
  }
}