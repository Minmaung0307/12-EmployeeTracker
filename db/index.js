const connection = require("./connection");

class employeeDB {
  constructor(connection) {
    this.connection = connection;
  }

  // Show all employees
  findAllEmployees() {
    return this.connection.promise().query("SELECT * FROM employee");
  }

  // show employees with their correspondence
  allEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.firstName, employee.lastName, role.title, department.name AS department, role.salary, CONCAT(manager.firstName, ' ', manager.lastName) AS manager FROM employee LEFT JOIN role on employee.roleId = role.id LEFT JOIN department on role.departmentId = department.id LEFT JOIN employee manager on manager.id = employee.managerId;"
      );
  }

  // Add an employee
  addEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  //delete an employee
  deleteEmployee(id) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", id);
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET roleId = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }

  // Update the given employee
  updateEmployee(employeeId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET employeeId = ? WHERE id = ?", [employeeId]);
  }

  // Update employee with manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET managerId = ? WHERE id = ?", [
        managerId,
        employeeId,
      ]);
  }

  // Show all managers
  allManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, firstName, lastName FROM employee WHERE id != ?",
        employeeId
      );
  }

  // Show all roles
  findAllRoles() {
    return this.connection.promise().query("SELECT * FROM role");
  }

  //show role with its correspondence
  allRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.departmentId = department.id;"
      );
  }

  // Create a new role
  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  deleteRole(id) {
    return this.connection.promise().query("DELETE FROM role WHERE id = ?", id);
  }

  // Show all departments
  findAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  //show departments with their correspondense
  allDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  // Add a department
  addDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  deleteDepartment(id) {
    return this.connection
      .promise()
      .query("DELETE FROM department WHERE id = ?", id);
  }
}

module.exports = new employeeDB(connection);
