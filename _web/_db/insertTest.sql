USE estufa;

INSERT INTO usuarios (nome, codigo) VALUES
  ('miguel', 'a0a0a0');
INSERT INTO plantas (nome, min_umidade_solo, max_umidade_solo, min_umidade_ar, max_umidade_ar, min_temperatura, max_temperatura) VALUES
  ('coiso', 50, 70, 20, 35, 20, 50);
DELETE FROM dados;
INSERT INTO dados (codigo, planta, temperatura, umidade_solo, umidade_ar, reservatorio, rpm, data, hora) VALUES
  ('a0a0a0', 1, 15, 42, 22, 2, 500, CURRENT_DATE(), CURRENT_TIME()),
  ('a0a0a0', 1, 12, 37, 17, 55, 200, CURRENT_DATE(), CURRENT_TIME()),
  ('a0a0a0', 1, 21, 45, 25, 2, 500, CURRENT_DATE(), CURRENT_TIME()),
  ('a0a0a0', 1, 35, 51, 31, 55, 200, CURRENT_DATE(), CURRENT_TIME()),
  ('a0a0a0', 1, 41, 49, 29, 2, 500, CURRENT_DATE(), CURRENT_TIME()),
  ('a0a0a0', 1, 33, 40, 20, 2, 200, CURRENT_DATE(), CURRENT_TIME()),
  ('a0a0a0', 1, 23, 26, 6, 29, 346, CURRENT_DATE(), CURRENT_TIME());