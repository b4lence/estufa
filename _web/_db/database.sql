CREATE DATABASE estufa;

USE estufa;

CREATE TABLE plantas (
	id INT AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  umidade_solo INT NOT NULL,
  umidade_ar INT NOT NULL,
  temperatura INT NOT NULL,
  foto VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  codigo VARCHAR(6) NOT NULL,
  planta INT NOT NULL,
  foto VARCHAR(255) NOT NULL,
  UNIQUE KEY (codigo),
  PRIMARY KEY(id),
  FOREIGN KEY(planta) REFERENCES plantas(id)
);

CREATE TABLE dados (
  id INT AUTO_INCREMENT,
  usuario VARCHAR(6) NOT NULL,
  planta INT NOT NULL,
  temperatura DECIMAL(10,2) NOT NULL,
  umidade_ar DECIMAL(10,2) NOT NULL,
  umidade_solo DECIMAL(10,2) NOT NULL,
  reservatorio INT NOT NULL,
  data DATETIME NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(usuario) REFERENCES usuarios(codigo) ON DELETE CASCADE,
  FOREIGN KEY(planta) REFERENCES plantas(id) ON DELETE CASCADE
);