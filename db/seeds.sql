INSERT INTO departments (deparment_name)
VALUES  ("Finance"),
        ("Fulfillment"),
        ("Human Resources"),
        ("Software Development");

INSERT INTO roles (job_title, department_id, salary)
VALUES  ("Accountant", 1, 64201),
        ("Budget Analyst", 1, 68490),
        ("Financial Analyst", 1, 82103),
        ("Financial Manager", 1, 106395),
        ("Delivery Station Associate", 2, 45760),
        ("Distribution Center Associate", 2, 36400),
        ("Fulfillment Center Associate", 2, 44200),
        ("Area Manager", 2, 72800),
        ("HSE Advisor", 3, 65000),
        ("Human Resources Executive", 3, 80000),
        ("Chief Safety Officer", 3, 48000),
        ("Compensation Manager", 3, 95000),
        ("Full Stack Developer", 4, 102244),
        ("Cloud Engineer", 4, 120740),
        ("Software Engineer", 4, 127169),
        ("Software Engineering Manager", 4, 134363);

INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id)
VALUES  ("Ross", "Geller", 1, 1, 4),
        ("Rachel", "Green", 2, 1, 4),
        ("Monica", "Geller", 3, 1, 4),
        ("Joey", "Tribbiani", 4, 1, NULL),
        ("Phoebe", "Buffay", 5, 2, 8),
        ("Chandler", "Bing", 6, 2, 8),
        ("Leslie", "Knope", 7, 2, 8),
        ("Ben", "Wyatt", 8, 2, NULL),
        ("Tom", "Haverford", 9, 3, 12),
        ("Ann", "Perkins", 10, 3, 12),
        ("April", "Ludgate", 11, 3, 12),
        ("Andy", "Dwyer", 12, 3, NULL),
        ("Ron", "Swanson", 13, 4, 16),
        ("Jean", "Ralphio", 14, 4, 16),
        ("Jerry", "Gergich", 15, 4, 16),
        ("Christopher", "Traeger", 16, 4, NULL);
