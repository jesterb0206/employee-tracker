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

// Add a department //

async function addDepartment() {
  const { department } = await inquirer.prompt([
    {
      type: "input",
      message: "Enter a name for the department you wish to add!",
      name: "department",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log(
            "Please enter a name for the department you wish to add!"
          );
        }
        return true;
      },
    },
  ]);
  try {
    db.query(
      `INSERT INTO departments (department_name) VALUES ("${department}")`
    );
    console.log(`${department} added to departments!`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}

// Add a role //

async function addRole() {
  let departments = await db.query("SELECT * FROM departments;");

  let departmentList = departments.map((department) => {
    return { name: department.department_name, value: department.id };
  });

  const { job_title, salary, department_id } = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the job title of the new role you wish to add!",
      name: "job_title",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log(
            "Please enter the job title of the new role you wish to add!"
          );
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the salary of the new role you wish to add!",
      name: "salary",
      validate: function (answer) {
        if (answer.length < 1) {
          return console.log(
            "Please enter the salary of the new role you wish to add!"
          );
        }
        return true;
      },
    },
    {
      type: "list",
      message: "Select a department for the new role you wish to add!",
      choices: departmentList,
      name: "department_id",
      validate: function (answer) {
        if (!answer) {
          return console.log(
            "Please select a department for the new role you wish to add!"
          );
        }
        return true;
      },
    },
  ]);

  try {
    await db.query(
      `INSERT INTO roles (job_title, salary, department_id) VALUES ("${job_title}", "${salary}", "${department_id}")`
    );
    console.log(`${job_title} added to roles.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}

// Add an employee //

async function addEmployee() {
  // Select all current roles

  let roles = await db.query("SELECT id, job_title FROM roles;");

  // Map out list of roles and add the roll ID value to company_db

  let roleList = roles.map((role) => {
    return { name: role.job_title, value: role.id };
  });

  // Select all of the current departments

  let departments = await db.query("SELECT * FROM departments;");

  let departmentList = departments.map((department) => {
    return { name: department.department_name, value: department.id };
  });

  // An array of managers to select from is created

  let managers = await db.query(
    "SELECT id, first_name, last_name FROM employees;"
  );

  // Maps out list of managers according to their ID
  let managerList = managers.map((manager) => {
    return {
      name: manager.first_name + " " + manager.last_name,
      value: manager.id,
    };
  });

  const { first_name, last_name, role_id, department_id, manager_id } =
    await inquirer.prompt([
      {
        type: "input",
        message: "Enter the first name of the employee you wish to add!",
        name: "first_name",
        validate: function (answer) {
          if (answer.length < 2) {
            return console.log(
              "Please enter the first name of the employee you wish to add!"
            );
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Enter the last name of the employee you wish to add!",
        name: "last_name",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log(
              "Please enter the last name of the employee you wish to add!"
            );
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Select a role for the employee you wish to add!",
        choices: roleList,
        name: "role_id",
        validate: function (answer) {
          if (!answer) {
            return console.log(
              "Please select a role for the employee you wish to add!"
            );
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Select a department for the employee you wish to add!",
        choices: departmentList,
        name: "department_id",
        validate: function (answer) {
          if (!answer) {
            return console.log(
              "Please select a department for the employee you wish to add!"
            );
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Select a manager for the employee you wish to add!",
        choices: managerList,
        validate: function (answer) {
          if (!answer) {
            return console.log(
              "Please select a manager for the employee you wish to add!"
            );
          }
          return true;
        },
      },
    ]);

  // Add information to the employees table

  try {
    await db.query(
      `INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${department_id}", "${manager_id}");`
    );
    console.log(`${first_name} ${last_name} added to employees.`);
  } catch (err) {
    console.error(err);
  }
  askFirstQuestion();
}
