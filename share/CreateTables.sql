-- Users table
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS messages;




CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Sessions table to track logged-in users
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Updated Messages table to store messages from users
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT,
    file_name VARCHAR(255),
    file_data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_private BOOLEAN DEFAULT 0,  -- 0 for public, 1 for private
    FOREIGN KEY (user_id) REFERENCES users(id)
);

