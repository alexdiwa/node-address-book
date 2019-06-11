require('events').EventEmitter.defaultMaxListeners = 50;
const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");

let contacts = [];

// INITIALIZE APP
let main = () => {
  console.log(chalk.blue("Welcome to your address book!"))
  showOptions();
}

// MAIN MENU
let showOptions = () => {
  let options = {
    type: 'list',
    name: 'view',
    message: 'What do you want to do?',
    choices: [
      'Add a contact',
      'View contacts',
      'Remove a contact',
      'Exit'
    ]
  }
  inquirer
    .prompt(options)
    .then(answers => {
      if (answers.view === 'Add a contact') {
        addContact();
      } else if (answers.view === 'View contacts') {
        viewAllContacts();
      } else if (answers.view === 'Remove a contact') {
        removeContact();
      } else {
        console.log("Seeya later!!");
        return;
      }
    })
    .catch(err => console.log(err))
}

// ADD CONTACT
let addContact = () => {
  let addContactQuestions = [
    {
      name: 'name',
      message: 'Please enter a contact name',
    },
    {
      name: 'number',
      message: 'Please enter a contact number',
    }
  ]

  inquirer
    .prompt(addContactQuestions)
    .then(answers => {
      contacts.push(answers);
      updateContacts();
      console.log("---------");
      showOptions();
    })
    .catch(err => console.log(err))
}

// VIEW ALL CONTACTS
let viewAllContacts = () => {
  if (contacts.length === 0) {
    console.log("You have no contacts. Start adding!");
    showOptions();
  } else {
    console.log("Your contacts are:");
    contacts.forEach(contact => {
      console.log(contact);
    })
    showOptions();
  }
}

// REMOVE A CONTACT
let removeContact = () => {
  let contactNames = [];
  contacts.map(contact => contactNames.push(contact.name));
  
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
          console.log(`${contactName} has been successfully deleted`)
        }
      })
      updateContacts();
      console.log("---------");
      showOptions();
    })
    .catch(err => console.log(err))
}

// UPDATE CONTACTS

let updateContacts = () => {
  fs.writeFile("contacts.txt", JSON.stringify(contacts), (err) => {
    if (err) {
      throw err;
    }
    console.log('contacts.txt updated!')
  });
}


main();