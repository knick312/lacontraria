CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type ENUM('image', 'video') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertar un usuario administrador
INSERT INTO users (username, password, role) VALUES ('admin', 'password', 'admin');

-- Insertar algunas publicaciones de ejemplo
INSERT INTO posts (type, title, description, file, user_id) VALUES
  ('image', 'Foto 1', 'Descripción de la foto 1', 'foto1.jpg', 1),
  ('video', 'Video 1', 'Descripción del video 1', 'video1.mp4', 1),
  ('image', 'Foto 2', 'Descripción de la foto 2', 'foto2.jpg', 1),
  ('video', 'Video 2', 'Descripción del video 2', 'video2.mp4', 1);


