CREATE DATABASE estufa;

USE estufa;

CREATE TABLE plantas (
	id INT AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    min_umidade INT NOT NULL,
    max_umidade INT NOT NULL,
    min_temperatura INT NOT NULL,
    max_temperatura INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(6) NOT NULL,
    UNIQUE KEY (codigo),
    PRIMARY KEY(id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dados (
    id INT AUTO_INCREMENT,
    codigo VARCHAR(6) NOT NULL,
    planta INT NOT NULL,
    temperatura DECIMAL(10,2) NOT NULL,
    umidade DECIMAL(10,2) NOT NULL,
    reservatorio INT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(codigo) REFERENCES usuarios(codigo) ON DELETE CASCADE,
    FOREIGN KEY(planta) REFERENCES plantas(id) ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
