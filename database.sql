-- Creacion de la base de datos y esquema inicial
CREATE DATABASE proyectom2;

-- Creación de la tabla de Autores
CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla de Publicaciones (Relacionada con Autores)
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_author
        FOREIGN KEY (author_id) 
        REFERENCES authors(id)
        ON DELETE CASCADE
);

-- Inserción de Datos Semilla (Seeds - Basados en JSONPlaceholder)
INSERT INTO authors (name, email, bio) VALUES 
('Leanne Graham', 'Sincere@april.biz', 'Usuario de prueba oficial del modelo JSONPlaceholder.'),
('Ervin Howell', 'Shanna@melissa.tv', 'Apasionado por las tecnologías web y el desarrollo backend.'),
('Clementine Bauch', 'Nathan@yesenia.net', 'Escritora técnica enfocada en bases de datos relacionales.');

INSERT INTO posts (author_id, title, content, published) VALUES 
(1, 'Primeros pasos en DevSpark', 'Este es un post inicial para validar las relaciones en la base de datos.', true),
(2, 'Explorando Express y Postgres', 'Express es un framework excelente para crear APIs robustas de forma rápida.', true);


-- Creación de la tabla de Comentarios (Relacionada con Posts y Authors)
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    author_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_post
        FOREIGN KEY (post_id) 
        REFERENCES posts(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comment_author
        FOREIGN KEY (author_id) 
        REFERENCES authors(id)
        ON DELETE CASCADE
);

-- Inserción de Datos Semilla para Comentarios
INSERT INTO comments (post_id, author_id, content) VALUES 
(1, 2, '¡Excelente explicación! Me sirvió mucho para arrancar.'),
(2, 3, 'Totalmente de acuerdo, Express simplifica muchísimo las cosas.');