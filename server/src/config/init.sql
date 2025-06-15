USE vems_db;

-- Insert test users (password is 'password123' hashed with bcrypt)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$8B4CmKooyzXXrJd4PPbEYecUU6mT/3q2i4T7cKRZ.jA3XhRO0/4NO', 'staff'),
('Test Student', 'student@example.com', '$2a$10$8B4CmKooyzXXrJd4PPbEYecUU6mT/3q2i4T7cKRZ.jA3XhRO0/4NO', 'student');

-- Insert test programs
INSERT INTO programs (name, description, start_date, end_date, status) VALUES
('Summer Internship 2024', 'Summer internship program for students', '2024-06-01', '2024-08-31', 'active'),
('Winter Workshop 2024', 'Technical workshop during winter break', '2024-12-15', '2024-12-30', 'active');

-- Insert test applications
INSERT INTO applications (user_id, program_id, status) VALUES
(2, 1, 'pending'),
(2, 2, 'approved');

-- Insert test payments
INSERT INTO payments (user_id, amount, status, payment_method) VALUES
(2, 100.00, 'completed', 'credit_card'),
(2, 50.00, 'pending', 'bank_transfer');

-- Insert test reports
INSERT INTO reports (title, description, report_type, created_by) VALUES
('Q1 Financial Report', 'Financial report for Q1 2024', 'financial', 1),
('Program Applications Summary', 'Summary of program applications', 'application', 1); 