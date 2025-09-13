USE estufa;

INSERT INTO usuarios (nome, codigo, foto) VALUES
  ('miguel', 'a0a0a0', 'aafolou.jpg');
INSERT INTO plantas (nome, umidade_solo, umidade_ar, temperatura, foto) VALUES
  ('coiso', 50, 70, 20, 'aafolou.jpg');
DELETE FROM dados;
INSERT INTO dados (usuario, planta, temperatura, umidade_solo, umidade_ar, reservatorio, data) VALUES
  ('a0a0a0', 1, 15, 42, 22, 2, CURRENT_DATE()),
  ('a0a0a0', 1, 12, 37, 17, 5, CURRENT_DATE()),
  ('a0a0a0', 1, 21, 45, 25, 2, CURRENT_DATE()),
  ('a0a0a0', 1, 35, 51, 31, 5, CURRENT_DATE()),
  ('a0a0a0', 1, 41, 49, 29, 2, CURRENT_DATE()),
  ('a0a0a0', 1, 33, 40, 20, 2, CURRENT_DATE()),
  ('a0a0a0', 1, 23, 26, 6, 29, CURRENT_DATE());