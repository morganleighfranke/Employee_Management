DROP DATABASE IF EXISTS Employee_Management;
CREATE DATABASE Employee_Management;

USE Employee_Management;

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INTEGER,
  PRIMARY KEY (id)
--  FOREIGN KEY (department_id) REFERENCES department (id) 
 
);

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
   PRIMARY KEY (id)
 --  FOREIGN KEY (role_id) REFERENCES role(id),
--   manager_id INTEGER NULL,
--   FOREIGN KEY (manager_id) REFERENCES role(id)
);


INSERT INTO employee (first_name, last_name, role_id) VALUES ('Dillon', 'Barr', 2), ('Morgan', 'Franke', 2), ('Rachel', 'McAdams', 1), ('Raelene', 'Bar', 3), ('Lindsey', 'Smith', 4), ('Kat', 'Stamerits', 5), ('Kat', 'Smith', 1);
INSERT INTO role (title, salary, department_id) VALUES ('Manager', 100000, 1), ('Senior Software Engineer', 150000, 2), ('Junior Software Engineer', 60000, 2), ('Sales Manager', 150000, 1), ('Lead Software Engineer', 200000, 2), ('Salesperson', 100000, 3), ('Software Engineer', 100000, 2);
INSERT INTO department (name) VALUES ('Management'), ('Engineering'), ('Sales');


