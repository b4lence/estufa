CREATE DATABASE estufa;

USE estufa;

CREATE TABLE plantas (
	id INT AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  min_umidade_solo INT NOT NULL,
  max_umidade_solo INT NOT NULL,
  min_umidade_ar INT NOT NULL,
  max_umidade_ar INT NOT NULL,
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
  umidade_ar DECIMAL(10,2) NOT NULL,
  umidade_solo DECIMAL(10,2) NOT NULL,
  reservatorio INT NOT NULL,
  rpm INT NOT NULL,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(codigo) REFERENCES usuarios(codigo) ON DELETE CASCADE,
  FOREIGN KEY(planta) REFERENCES plantas(id) ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

INSERT INTO usuarios (nome, codigo) VALUES
  ('miguel', 'a0a0a0');
INSERT INTO plantas (nome, min_umidade_solo, max_umidade_solo, min_umidade_ar, max_umidade_ar, min_temperatura, max_temperatura) VALUES
  ('coiso', 50, 70, 20, 35, 20, 50);
INSERT INTO dados (codigo, planta, temperatura, umidade_solo, umidade_ar, reservatorio, rpm, data, hora) VALUES
  ('a0a0a0', 1, 11, 99, 99, 2, 500, CURRENT_DATE(), CURRENT_TIME()),
  ('a0a0a0', 1, 11, 11, 11, 99, 200, CURRENT_DATE(), CURRENT_TIME()),
  ('a0a0a0', 1, 21, 65, 15, 29, 346, CURRENT_DATE(), CURRENT_TIME());