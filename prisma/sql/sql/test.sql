
INSERT INTO sun (date, city_id,sunset, sunrise)
VALUES ('2023-12-07',411,'16:30:00', '08:30:00');

INSERT INTO menu (id, city_id, temperature, humidity, uv_index, wind_speed, wind_type, pressure, weather_type)
VALUES ('2023-12-07 18:24:00', 411, -5.0, 60, 2, 10, 'ЮВ', 980, "Солнечно");

INSERT INTO family (name)
VALUES ('Злаки'),
    ('Травы'),
    ('Деревья'),
    ('Грибы');

INSERT INTO flower (name, family)
VALUES ('Берёза','Деревья'),
    ('Ольха','Деревья'),
    ('Кладоспориум','Грибы');

INSERT INTO map (day, name_flower, x, y,lvl)
VALUES ('2023-12-13', 'Берёза', 12, 20,0),
    ('2023-12-13', 'Ольха', 30, 40,10),
    ('2023-12-13', 'Береза', 50, 60,100),
    ('2023-12-13', 'Кладоспориум', 7, 8,500);
