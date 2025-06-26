CREATE DATABASE estufa;

USE estufa;

CREATE TABLE plantas (
	id INT AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  min_umidade_solo INT NOT NULL,
  max_umidade_solo INT NOT NULL,
  min_temperatura INT NOT NULL,
  max_temperatura INT NOT NULL,
  endereco_img VARCHAR(255) NOT NULL,
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

USE estufa;

INSERT INTO plantas (nome, min_umidade_solo, max_umidade_solo, min_temperatura, max_temperatura) VALUES
  ('Suculentas',20,30,18,24),
  ('Espada-de-São-Jorge',30,50,18,30),
  ('Jiboia',50,60,18,24),
  ('Hera Inglesa',50,70,15,24),
  ('Bambu da sorte',40,60,18,24),
  ('Lírio da paz',50,60,18,24),
  ('Ráfis',50,60,18,24),
  ('Zamioculca',30,40,18,24),
  ('Crassula',20,30,18,24),
  ('Costela-de-adão',50,60,18,27),
  ('Bromélia',40,60,18,28),
  ('Begônia',50,60,18,24),
  ('Pothos',50,60,18,30),
  ('Maranta',50,60,18,24),
  ('Calatheia',50,60,18,24),
  ('Violetas',40,50,18,24),
  ('Lavanda',20,30,15,25),
  ('Coração-sangrento',50,60,20,30),
  ('Orquídea',50,70,18,30),
  ('Kalanchoe',30,40,18,28),
  ('Menta',50,60,15,25),
  ('Alecrim',20,30,15,25),
  ('Pimenta ornamental',40,60,18,30),
  ('Tomilho',20,40,15,25),
  ('Manjericão',50,60,18,30),
  ('Cebolinha',50,60,15,24),
  ('Peperômia',40,60,18,24),
  ('Ficus elastica',40,60,18,24),
  ('Ficus pumila',50,60,18,24),
  ('Cacto-de-natal',40,60,13,24),
  ('Flor-do-natal',50,70,15,22),
  ('Cipriano',70,100,26,30),
  ('Orquídea Phalaenopsis',40,60,16,28),
  ('Orquídea Dendrobium',50,70,14,30),
  ('Cacto de madrepérola',20,40,10,28),
  ('Flor-de-maio',40,60,13,24),
  ('Gloxínia',50,70,15,25),
  ('Centaurea',40,60,10,22),
  ('Verbenas',20,60,15,30),
  ('Streptocarpus',50,60,18,25),
  ('Coleus',50,70,18,30),
  ('Kalanchoe',10,20,13,29),
  ('Cinerária',20,30,12,18),
  ('Fuchsia',40,60,15,24),
  ('Fitônia',60,80,18,24),
  ('Singônio',50,70,18,24),
  ('Zamioculca',30,50,18,27),
  ('Violeta-africana',50,70,18,24),
  ('Begônia rex',60,80,18,24),
  ('Mini violetas',50,70,18,24),
  ('Lírio-da-paz-anão',60,80,18,24),
  ('Clorofito',50,70,18,24),
  ('Feto-de-natal',60,80,18,24),
  ('Babosa',10,20,20,30),
  ('Cacto-mamilaria',5,15,20,30),
  ('Jiboia-anã',40,60,18,24),
  ('Peixinho',60,75,18,24),
  ('Mini samambaia',70,90,16,24),
  ('Planta-pérola',20,40,18,24),
  ('Sedum',15,30,18,26),
  ('Columéia',60,75,18,24),
  ('Dona-de-casa',60,80,18,24),
  ('Muehlenbeckia',50,70,15,25),
  ('Polka Dot Plant',60,75,18,24),
  ('Pilea peperomioides',50,70,18,24),
  ('Cactus Bunny Ear',5,15,20,30),
  ('Planta do dinheiro',50,70,18,26),
  ('Ripsális',50,70,18,24),
  ('Cactus estrela',5,15,20,30),
  ('Mini Hibisco',60,75,20,28),
  ('Pequeno lírio do vale',60,80,15,22),
  ('Falso-jacarandá',50,70,18,25),
  ('Mini Orquídea',60,80,18,26),
  ('Ceropegia woodii',40,60,18,26)