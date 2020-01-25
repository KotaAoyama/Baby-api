BEGIN TRANSACTION;

INSERT INTO babies (baby_name, country_code) VALUES
('kota', 'JP'),
('john', 'US'),
('suzan', 'UK'),
('shin', 'UK');

COMMIT;
