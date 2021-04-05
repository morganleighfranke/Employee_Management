const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Sept172021',
    database: 'employee_management',
});


connection.connect((err) => {
    if (err) throw err;
    runProgram();
    //connection.end();
});

const runProgram = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add an employee',
                'Add a department',
                'Add a role',
                'View all departments',
                'View all roles',
                'View all employees',
                'Update employee role',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all roles':   
                viewAllRoles();
                    break;

                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'Update employee role':
                    updateRole();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const addEmployee = () => {
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'firstname',
        message: 'What is the first name of the employee?'
        },
        {
        type: 'input',
        name: 'lastname',
        message: 'What is the last name of the employee?'
        },
        {
        type: 'input',
        name: 'roleid',
        message: 'What is this employees roleId?'
        }
    ]).then((answer) => {
        connection.query('INSERT INTO employee SET ?',
        {
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: answer.roleid || 0,

        },
        (err) => {
            if(err) throw err;
            console.log('employee is added to the employee list');
            runProgram();
        }
        );
    });
}; 

const addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentname',
            message: 'What is the name of the department?'
        },
    ]).then((answer) => {
        connection.query( 'INSERT INTO department SET ?',
        {
            name: answer.departmentname,
        },
        (err) => {
            if(err) throw err;
            console.log('new deparment added');
            runProgram();
        }
        )
    })
}

const addRole = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'input',
            name: 'departmentid',
            message: 'What is the department id?'
        },
    ]).then((answer) => {
        connection.query( 'INSERT INTO role SET ?',
        {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentid
        },
        (err) => {
            if(err) throw err;
            console.log('new title added');
            runProgram();
        }
        )
    })
}

const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.table(result);
        runProgram();
    })
}

const viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, result) => {
        if (err) throw err;
        console.table(result);
        runProgram();
    })
}


const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, result) => {
        if (err) throw err;
        console.table(result);
        runProgram();
    })
}


// const updateRole = () => {
//     connection.query('SELECT * FROM department', (err, result) => {
//         if (err) throw err;
//         console.table(result);
//         runProgram();
//     })
// }