CREATE DATABASE projeto;

USE projeto;

CREATE TABLE targets(
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(25) NOT NULL,
    moisture INT NOT NULL,
    temp INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users(
	id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(25) NOT NULL,
	pwd VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_data(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    target_plant INT NOT NULL,
    recorded_time DATETIME NOT NULL,
    moisture INT NOT NULL,
    temp INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (target_plant) REFERENCES targets(id)
);

INSERT INTO targets(`name`, `moisture`, `temp`) VALUES
	('espada-sao-jorge', 40, 24);

INSERT INTO users(`email`, `pwd`) VALUES
	('miguel@gmail.com', '12345');

INSERT INTO user_data(`user_id`, `target_plant`, `recorded_time`, `moisture`, `temp`) VALUES
	(1, 1, '2025-03-04 20:03:59', 41, 23);
