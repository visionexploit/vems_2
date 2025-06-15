# VEMS Database Design Documentation

## Overview

The Vision Exploit Management System (VEMS) database is designed to manage student applications, university partnerships, and related processes. The database uses MySQL and follows a relational database design pattern.

## Database Schema

### Users Table
- Primary table for user authentication and authorization
- Stores user credentials and role information
- Links to student profiles for student users

### Students Table
- Stores detailed student information
- Links to user accounts
- Contains personal and educational information

### Universities Table
- Stores university information
- Manages university partnerships
- Contains contact and status information

### Programs Table
- Stores academic program information
- Links to universities
- Contains program details, requirements, and fees

### Applications Table
- Manages student applications to programs
- Tracks application status and progress
- Links students to programs

### Documents Table
- Stores application-related documents
- Manages document status and verification
- Links to applications

### Payments Table
- Tracks application and program payments
- Manages payment status and transactions
- Links to applications

### Notifications Table
- Manages system notifications
- Tracks notification status
- Links to users

## Relationships

1. Users -> Students (One-to-One)
   - A user can have one student profile
   - A student profile belongs to one user

2. Universities -> Programs (One-to-Many)
   - A university can have multiple programs
   - A program belongs to one university

3. Students -> Applications (One-to-Many)
   - A student can have multiple applications
   - An application belongs to one student

4. Programs -> Applications (One-to-Many)
   - A program can have multiple applications
   - An application is for one program

5. Applications -> Documents (One-to-Many)
   - An application can have multiple documents
   - A document belongs to one application

6. Applications -> Payments (One-to-Many)
   - An application can have multiple payments
   - A payment belongs to one application

7. Users -> Notifications (One-to-Many)
   - A user can have multiple notifications
   - A notification belongs to one user

## Indexes

The database uses the following indexes to optimize query performance:

1. Users Table
   - Primary Key: id
   - Unique Index: email

2. Students Table
   - Primary Key: id
   - Index: user_id

3. Applications Table
   - Primary Key: id
   - Indexes: student_id, program_id

4. Documents Table
   - Primary Key: id
   - Index: application_id

5. Payments Table
   - Primary Key: id
   - Index: application_id

6. Notifications Table
   - Primary Key: id
   - Index: user_id

## Data Types

The database uses appropriate data types for each column:

- INT: For IDs and numeric values
- VARCHAR: For strings with known maximum length
- TEXT: For long text content
- ENUM: For fixed set of values
- DECIMAL: For monetary values
- TIMESTAMP: For dates and times
- BOOLEAN: For true/false values

## Security Considerations

1. Password Storage
   - Passwords are hashed using bcrypt
   - Salt is automatically generated and stored

2. Data Access
   - Role-based access control
   - User permissions are managed through the role field

3. Data Integrity
   - Foreign key constraints ensure referential integrity
   - Cascade deletes where appropriate
   - Set NULL for optional relationships

## Backup and Recovery

1. Regular Backups
   - Daily automated backups
   - Backup files stored in database/backups directory

2. Recovery Procedures
   - Point-in-time recovery available
   - Transaction logs maintained

## Maintenance

1. Regular Maintenance Tasks
   - Index optimization
   - Table statistics updates
   - Log rotation

2. Performance Monitoring
   - Query performance tracking
   - Resource usage monitoring
   - Connection pool management 