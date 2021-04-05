//required connections
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');

//setting up the server to connect to mysql
//add in your own user and password
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
});

//this function prompts the user to decide what action they want to take to add view or update the database
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

//this function allows you to add an employee through inquirer and mysql
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

//this function allows you to add a department through inquirer and mysql
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


//this function allows you to add a role through inquirer and mysql
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


//this function allows you to view all departments
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.table(result);
        runProgram();
    })
}

//this function allows you to view all roles
const viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, result) => {
        if (err) throw err;
        console.table(result);
        runProgram();
    })
}

//this function allows you to view all employees
const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (err, result) => {
        if (err) throw err;
        console.table(result);
        runProgram();
    })
}

//this function allows you to update an employees role
const updateRole = () => {
    connection.query('SELECT * FROM employee', (err, result) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'rawlist',
                choices() {
                    const choicesArray = [];
                    result.forEach(({ first_name }) => {
                        choicesArray.push(first_name);
                    });
                    return choicesArray;
                },
                message: 'Choose the employee you want to update.',
            },
            {
                name: 'updateRoleId',
                type: 'input',
                message: 'What is the new roleid?',
            },
        ]).then((answer) => {
            let newID;
            result.forEach((role_id) => {
                if(role_id.first_name === answer.choice) {
                    newID = role_id;
                }
            });
            if(parseInt(answer.updateRoleId)) {
                connection.query('UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: answer.updateRoleId,
                    },
                    {
                        id: newID.id,
                    },
                ],
                (error) => {
                    if(error) throw err;
                    console.log('new roleid updated.');
                    runProgram();
                }
                );
            } else {
                console.log('please try again');
                runProgram();
            }
        });
    });
};