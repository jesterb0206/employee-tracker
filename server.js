const inquirer = require("inquirer");
const util = require("util");
const table = require("console.table");
const db = require("./db/connection");

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

// View all departments //

async function viewAllDepartments() {
  try {
    var results = await db.query("SELECT * FROM departments;");
    console.table(results);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}

// View all roles //

async function viewAllRoles() {
  try {
    var results = await db.query("SELECT * FROM roles;");
    console.table(results);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}

// View all employees //

async function viewAllEmployees() {
  try {
    var results = await db.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.salary, roles.job_title, departments.department_name, managers.first_name AS manager_first_name, managers.last_name AS manager_last_name
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON employees.department_id = departments.id
        LEFT JOIN employees managers ON employees.manager_id = managers.id;`);
    console.table(results);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}
