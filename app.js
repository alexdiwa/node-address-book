require('events').EventEmitter.defaultMaxListeners = 50;
const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
let contacts;

if (fs.readFileSync("contacts.txt", "utf8") === "") {
  contacts = {};
} else {
  contacts = JSON.parse(fs.readFileSync("contacts.txt", "utf8"));
}

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
      'View all contacts',
      "View a contact's number",
      'Remove a contact',
      'Exit'
    ]
  }
  inquirer
    .prompt(options)
    .then(answers => {
      if (answers.view === 'Add a contact') {
        addContact();
      } else if (answers.view === 'View all contacts') {
        viewAllContacts();
      } else if (answers.view === "View a contact's number") {
        viewContactNumber();
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
      contacts[answers.name] = answers.number;
      console.log(contacts);
      updateContacts();
      console.log("---------");
      showOptions();
    })
    .catch(err => console.log(err))
}

// VIEW ALL CONTACTS
let viewAllContacts = () => {
  if (Object.entries(contacts).length === 0 && contacts.constructor === Object) {
    console.log("You have no contacts. Start adding!");
    showOptions();
  } else {
    console.log("Your contacts are:");
    for (let contact in contacts) {
      console.log(`${contact}: ${contacts[contact]}`);
    }
    showOptions();
  }
}

// REMOVE A CONTACT
let removeContact = () => {
  let contactNames = Object.keys(contacts);

  let removeWhichContact = {
    type: 'list',
    name: 'contactToDelete',
    message: 'Which contact do you want to delete?',
    choices: contactNames
  }
  
  inquirer
    .prompt(removeWhichContact)
    .then(answer => {
      let contactName = answer.contactToDelete;
      delete contacts[contactName];
      updateContacts();
      console.log("---------");
      showOptions();
    })
    .catch(err => console.log(err))
}

// VIEW CONTACT NUMBER

let viewContactNumber = () => {
  let contactNames = Object.keys(contacts);
  
  let viewWhichContact = {
    type: 'list',
    name: 'contactToView',
    message: 'Which contact do you want to view?',
    choices: contactNames
  }

  inquirer
    .prompt(viewWhichContact)
    .then(answer => {
      let contactName = answer.contactToView;
      console.log(`${contactName}'s number is ${contacts[contactName]}`)
      showOptions();
    })
    .catch(err => console.log(err))
    
}

// WRITE CONTACTS TO FILE

let updateContacts = () => {
  fs.writeFile("contacts.txt", JSON.stringify(contacts), (err) => {
    if (err) {
      throw err;
    }
    console.log('contacts.txt updated!')
  });
}


main();