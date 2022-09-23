use employeeTracker;

INSERT INTO department
    (name)
VALUES
    ('Pali'),
    ('Vinaya'),
    ('Abhidhamma'),
    ('Suttanta'),
    ('Patipatti');

INSERT INTO role
    (title, salary, departmentId)
VALUES
    ('Reader', 10000, 1),
    ('Professor', 50000, 1),
    ('Tutor', 14000, 2),
    ('Counselor', 25000, 2),
    ('Instructor', 49500, 3),
    ('Manager', 30000, 3),
    ('Rector', 31000, 4),
    ('Chancellor', 51000, 5);

INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES
    ('Min', 'Maung', 1, NULL),
    ('Panna', 'Siha', 2, 1),
    ('Javana', 'Tikkha', 3, 1),
    ('Joti', 'Pala', 4, 3),
    ('Nanda', 'Marlar', 4, 3),
    ('Uttama', 'Siri', 5, NULL),
    ('Vilasa', 'Moli', 6, 5),
    ('Kumara', 'Nanda', 6, 5),
    ('Kheminda', 'Vamsa', 7, NULL),
    ('Khema', 'Siri', 7, 8);
