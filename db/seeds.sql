INSERT INTO departments (department_name)
VALUES ("IT"),
       ("Finance"),
       ("Legal"),
       ("Marketing");

INSERT INTO roles (job_title, department_id, salary)
VALUES ("Marketing Manager", 4, 135030),
       ("Accountant", 2, 73560),
       ("Software Engineer", 1, 94011),
       ("Lawyer", 3, 126930),
       ("Front End Developer", 1, 79177);

INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id)
VALUES ("Bradley", "Jester", 1, 4, NULL),
       ("Mackenzie", "Olson", 2, 2, 1),
       ("Rosalinda", "Ramirez", 3, 1, 1),
       ("Haneia", "Simpson", 4, 3, 1);