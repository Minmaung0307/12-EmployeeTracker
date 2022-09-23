1. schema.sql
   structure for db
2. seeds.sql
   insert mock data into db
3. connection.js
   this is where to create connections for app to actual mysql db
4. index.js inside db folder (optional)
   to create query
5. connect query to app outside of db
   prompt user questions

npm init -y
npm install express mysql2
npm install jest --save-dev
npm i inquirer@8.2.4

// function example(a,b,c){
// return a-b-c
// }
// example(10,5,2) return 3
// example(5,5,5) return -5

updateEmployee(employee) {
return this.connection
.promise()
.query("UPDATE employee SET firstName = ?, lastName = ? WHERE id = ?", [
employee.firstName,
employee.lastName,
employee.id,
]);
}
