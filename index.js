const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

// initial function at NPM start
function init() {
  runPrompts();
}

function runPrompts() {
  prompt([
    {
      // Load these prompts on NPM start
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        // {
        //   name: "View All Managers",
        //   value: "VIEW_MANAGERS",
        // },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update an Employee",
          value: "UPDATE_EMPLOYEE",
        },
        {
          name: "Delete a Department",
          value: "DELETE_DEPARTMENT",
        },
        {
          name: "Delete a Role",
          value: "DELETE_ROLE",
        },
        {
          name: "Delete an Employee",
          value: "DELETE_EMPLOYEE",
        },
        {
          name: "Exit",
          value: "Exit",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // Call the functions from what the user selects
    switch (choice) {
      case "VIEW_DEPARTMENTS":
        viewAllDepartments();
        break;
      case "VIEW_ROLES":
        viewAllRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewAllEmployees();
        break;
      case "VIEW_MANAGERS":
        viewAllManagers();
        break;
      case "ADD_DEPARTMENT":
        createDepartment();
        break;
      case "ADD_ROLE":
        createRole();
        break;
      case "ADD_EMPLOYEE":
        createEmployee();
        break;
      case "UPDATE_EMPLOYEE":
        updateEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "DELETE_DEPARTMENT":
        deleteDepartment();
        break;
      case "DELETE_ROLE":
        deleteRole();
        break;
      case "DELETE_EMPLOYEE":
        deleteEmployee();
        break;
      default:
        quit();
    }
  });
}

// View all deparments
function viewAllDepartments() {
  db.allDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => runPrompts());
}

// View all roles
function viewAllRoles() {
  db.allRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => runPrompts());
}

// View all employees
function viewAllEmployees() {
  db.allEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => runPrompts());
}

// // View all managers
// function viewAllManagers() {
//   db.allManagers()
//     .then(([rows]) => {
//       let managers = rows;
//       console.log("\n");
//       console.table(managers);
//     })
//     .then(() => runPrompts());
// }

// Add a department
function createDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((res) => {
    let name = res;
    db.addDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => runPrompts());
  });
}

// Add a role
function createRole() {
  db.allDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        message: "What is the salary rate?",
      },
      {
        type: "list",
        name: "departmentId",
        message: "Which department does the role fall in under?",
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.addRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => runPrompts());
    });
  });
}

// Add an employee
function createEmployee() {
  prompt([
    {
      name: "firstName",
      message: "What's the employee's first name?",
    },
    {
      name: "lastName",
      message: "What's the employee's last name?",
    },
  ]).then((res) => {
    let firstName = res.firstName;
    let lastName = res.lastName;

    db.allRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "What's the employee's role?",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;

        db.allEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, firstName, lastName }) => ({
              name: `${firstName} ${lastName}`,
              value: id,
            })
          );

          managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Who's the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                managerId: res.managerId,
                roleId: roleId,
                firstName: firstName,
                lastName: lastName,
              };
              db.addEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => runPrompts());
        });
      });
    });
  });
}

// Delete a department
function deleteDepartment() {
  db.allDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: `${name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to delete?",
        choices: departmentChoices,
      },
    ]).then((res) => {
      let name = res.departmentId;
      db.deleteDepartment(name)
        .then(() => console.log("Deleted ${name.name} from the database"))
        .then(() => runPrompts());
    });
  });
}

// Delete role
function deleteRole() {
  db.allRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: `${title}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role would you like to delete?",
        choices: roleChoices,
      },
    ]).then((res) => {
      let name = res.roleId;
      db.deleteRole(name)
        .then(() => console.log("Deleted ${name.name} from the database"))
        .then(() => runPrompts());
    });
  });
}

// Delete an employee
function deleteEmployee() {
  db.allEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, firstName, lastName }) => ({
      name: `${firstName} ${lastName}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee would you like to delete?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let name = res.employeeId;
      db.deleteEmployee(name)
        .then(() => console.log("Deleted ${name.name} from the database"))
        .then(() => runPrompts());
    });
  });
}

// Update an employee's role
function updateEmployeeRole() {
  db.allEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, firstName, lastName }) => ({
      name: `${firstName} ${lastName}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeId = res.employeeId;
      db.allRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "What's the new role of this employee?",
            choices: roleChoices,
          },
        ])
          .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
          .then(() => console.log("Employee's role is updated"))
          .then(() => runPrompts());
      });
    });
  });
}

// Update an employee
function updateEmployee() {
  let employeeId;
  let firstName;
  let lastName;
  db.allEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, firstName, lastName }) => ({
      name: `${firstName} ${lastName}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      employeeId = res.employeeId;

      prompt([
        {
          name: "firstName",
          message: "What's the employee's first name?",
        },
        {
          name: "lastName",
          message: "What's the employee's last name?",
        },
      ])
        .then((res) => {
          firstName = res.firstName;
          lastName = res.lastName;
          // console.log(firstName, lastName);
          // console.log(employeeId);
          let employee = {
            id: employeeId,
            firstName: firstName,
            lastName: lastName,
          };
          db.updateEmployee(employee);
        })
        .then(() =>
          console.log(`Updated ${firstName} ${lastName} to the database`)
        )
        .then(() => runPrompts());
    });
  });
}

// Quit the application
function quit() {
  process.exit();
}
