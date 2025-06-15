USE vems_db;

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@visionexploit.com', '$2b$10$YourHashedPasswordHere', 'admin');

-- Insert sample universities
INSERT INTO universities (name, country, city, website, contact_email, contact_phone, status) VALUES
('Istanbul University', 'Turkey', 'Istanbul', 'https://www.istanbul.edu.tr', 'info@istanbul.edu.tr', '+90 212 123 4567', 'active'),
('Bogazici University', 'Turkey', 'Istanbul', 'https://www.boun.edu.tr', 'info@boun.edu.tr', '+90 212 234 5678', 'active'),
('Middle East Technical University', 'Turkey', 'Ankara', 'https://www.metu.edu.tr', 'info@metu.edu.tr', '+90 312 345 6789', 'active');

-- Insert sample programs
INSERT INTO programs (university_id, name, level, duration, tuition_fee, description, requirements) VALUES
(1, 'Computer Science', 'bachelor', 48, 5000.00, 'Bachelor of Science in Computer Science', 'High school diploma, English proficiency'),
(1, 'Business Administration', 'master', 24, 8000.00, 'Master of Business Administration', 'Bachelor degree, GMAT score'),
(2, 'Electrical Engineering', 'bachelor', 48, 6000.00, 'Bachelor of Science in Electrical Engineering', 'High school diploma, Math proficiency'),
(2, 'International Relations', 'master', 24, 7500.00, 'Master of Arts in International Relations', 'Bachelor degree, English proficiency'),
(3, 'Mechanical Engineering', 'bachelor', 48, 5500.00, 'Bachelor of Science in Mechanical Engineering', 'High school diploma, Physics proficiency'),
(3, 'Architecture', 'master', 24, 9000.00, 'Master of Architecture', 'Bachelor degree, Portfolio');

-- Insert sample staff user (password: staff123)
INSERT INTO users (name, email, password, role) VALUES
('Staff User', 'staff@visionexploit.com', '$2b$10$YourHashedPasswordHere', 'staff');

-- Insert sample student user (password: student123)
INSERT INTO users (name, email, password, role) VALUES
('Student User', 'student@example.com', '$2b$10$YourHashedPasswordHere', 'student');

-- Insert sample student profile
INSERT INTO students (user_id, date_of_birth, gender, nationality, passport_number, phone_number, address, education_level) VALUES
(3, '2000-01-01', 'male', 'Nigeria', 'A12345678', '+234 123 456 7890', 'Lagos, Nigeria', 'High School');

-- Insert sample application
INSERT INTO applications (student_id, program_id, status, submission_date, notes) VALUES
(1, 1, 'submitted', NOW(), 'Application for Computer Science program');

-- Insert sample document
INSERT INTO documents (application_id, type, file_name, file_path, status) VALUES
(1, 'passport', 'passport.pdf', '/uploads/documents/passport.pdf', 'approved'),
(1, 'transcript', 'transcript.pdf', '/uploads/documents/transcript.pdf', 'pending');

-- Insert sample payment
INSERT INTO payments (application_id, amount, currency, status, payment_date, payment_method, transaction_id) VALUES
(1, 100.00, 'USD', 'completed', NOW(), 'credit_card', 'TRX123456');

-- Insert sample notification
INSERT INTO notifications (user_id, title, message, type) VALUES
(3, 'Application Submitted', 'Your application has been successfully submitted.', 'success'),
(3, 'Document Required', 'Please upload your language test results.', 'info'); 