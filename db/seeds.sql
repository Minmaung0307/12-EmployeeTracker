use buddhism;

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
    ('Reader', 100000, 1),
    ('Professor', 50000, 1),
    ('Tutor', 140000, 2),
    ('Counselor', 65000, 2),
    ('Instructor', 195000, 3),
    ('Manager', 100000, 3),
    ('Rector', 110000, 4),
    ('Chancellor', 90000, 5);

INSERT INTO employee
    (firstName, lastName, roleId, managerId)
VALUES
    ('Min', 'Maung', 1, NULL),
    ('Panna', 'Siha', 2, 1),
    ('Javana', 'Tikkha', 3, NULL),
    ('Joti', 'Pala', 4, 3),
    ('Nanda', 'Marlar', 4, 3),
    ('Uttama', 'Siri', 5, NULL),
    ('Vilasa', 'Moli', 6, 5),
    ('Kumara', 'Nanda', 6, 5),
    ('Kheminda', 'Vamsa', 7, NULL),
    ('Khema', 'Siri', 7, 8);
