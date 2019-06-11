const inquirer = require("inquirer");
const chalk = require("chalk");
require('events').EventEmitter.defaultMaxListeners = 50;
let contacts = [];


let main = () => {
  console.log(chalk.blue("Welcome to your address book!"))
  showOptions();
}

let options = {
  type: 'list',
  name: 'view',
  message: 'What do you want to do?',
  choices: [
    'Add a contact',
    'View a contact',
    'Remove a contact',
    'Exit'
  ]
}


let showOptions = () => {
  inquirer
    .prompt(options)
    .then(answers => {
      if (answers.view === 'Add a contact') {
        addContact();
      } else if (answers.view === 'View a contact') {
        viewAllContacts();
      } else if (answers.view === 'Remove a contact') {
        removeContact();
      } else {
        console.log("BYEEEEEE");
        return;
      }
    })
    .catch(err => console.log(err))
}


// ADD CONTACT
let addContactQuestions = [
  {
    name: 'name',
    message: 'what is your name?',
  },
  {
    name: 'number',
    message: 'what is your number?',
  }
]

let addContact = () => {
  inquirer
    .prompt(addContactQuestions)
    .then(answers => {
      contacts.push(answers);
      showOptions();
    })
}


// VIEW ALL CONTACTS
let viewAllContacts = () => {
  console.log("Your contacts are:");
  contacts.forEach(contact => {
    console.log(contact);
  })
  showOptions();
}

// REMOVE A CONTACT



let removeContact = () => {
  let contactNames = []
  contacts.map(contact => contactNames.push(contact.name))
  
  let removeWhichContact = {
    type: 'list',
    name: 'contactToDelete',
    message: 'Which contact do you want to delete?',
    choices: contactNames
  }
  

  inquirer
    .prompt(removeWhichContact)
    .then(answer => {
      contactName = answer.contactToDelete;
      contacts.forEach((contact, i) => {
        if (contact.name === contactName) {
          contacts.splice(i, 1);
          console.log(`${contactName} has been deleted`)
        }
      })
      showOptions();
    })
}


main();