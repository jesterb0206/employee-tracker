const inquirer = require("inquirer");
const util = require("util");
const table = require("console.table");
const db = require("./db/connection");
const { allowedNodeEnvironmentFlags } = require("process");

// Makes queries asynchronous //

db.query = util.promisify(db.query);

// Menu Question //

const firstQuestion = [
  {
    type: "list",
    message: "What do you want to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
    name: "response",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please select an option and hit return!");
      }
      return true;
    },
  },
];

// Menu Options //

function askFirstQuestion() {
  inquirer.prompt(firstQuestion).then(({ response }) => {
    if (response == "View all departments") {
      viewAllDepartments();
    } else if (response == "View all roles") {
      viewAllRoles();
    } else if (response == "View all employees") {
      viewAllEmployees();
    } else if (response == "Add a department") {
      addDepartment();
    } else if (response == "Add a role") {
      addRole();
    } else if (response == "Add an employee") {
      addEmployee();
    } else if (response == "Update an employee role") {
      updateEmployee();
    }
  });
}
