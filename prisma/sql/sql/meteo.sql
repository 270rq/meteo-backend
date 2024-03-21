-- Active: 1703681155737@@127.0.0.1@3306@meteo

CREATE TABLE IF NOT EXISTS region (
  id INT NOT NULL AUTO_INCREMENT,
  region_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS city (
  id INT NOT NULL,
  region_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (region_id,name),
  INDEX idx_city_id (id),
INDEX idx_region_id (region_id),
  CONSTRAINT fk_region_id_city FOREIGN KEY (region_id) REFERENCES region(id)
);

CREATE TABLE IF NOT EXISTS sun (
  date DATE NOT NULL,
  city_id int NOT NULL,
  sunrise TIME NOT NULL,
  sunset TIME NOT NULL,
  PRIMARY KEY (date, city_id),
  CONSTRAINT fk_city_id_sun FOREIGN KEY (city_id) REFERENCES city(id)
);

CREATE TABLE IF NOT EXISTS family (
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS flower (
  name VARCHAR(50) NOT NULL,
  family VARCHAR(50) NOT NULL,
  PRIMARY KEY (name),
  CONSTRAINT fk_family_name FOREIGN KEY (family) REFERENCES family(name),
  INDEX idx_flower_name (name)
);
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password LONGTEXT NOT NULL,
    allergen VARCHAR(50),
  CONSTRAINT allergen_flower_fk FOREIGN KEY (allergen) REFERENCES flower(name),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS menu (
  id DATETIME DEFAULT CURRENT_TIMESTAMP,
  city_id int NOT NULL,
  temperature INT NOT NULL,
  humidity INT NOT NULL,
  uv_index INT NOT NULL,
  wind_speed INT NOT NULL,
  wind_type ENUM ('С', 'СВ' , 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ') NOT NULL,
  pressure INT NOT NULL,
  weather_type ENUM ('Солнечно',  'Пасмурно',  'Дождь', 'Снег','Туман', 'Ветрено', 'Гроза' ) NOT NULL,
  PRIMARY KEY (id, city_id),
  CONSTRAINT fk_city_id_menu FOREIGN KEY (city_id) REFERENCES city(id)
);

CREATE TABLE IF NOT EXISTS map (
  day DATETIME NOT NULL,
  name_flower VARCHAR(50) NOT NULL,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  lvl INT NOT NULL CHECK (lvl >= 0),
  PRIMARY KEY (day, name_flower, x, y),
  CONSTRAINT fk_flower_name_map FOREIGN KEY (name_flower) REFERENCES flower(name)
);
CREATE TABLE IF NOT EXISTS  users_chois(
id_users INT NOT NULL,
chois VARCHAR(50) NOT NULL,
PRIMARY KEY (id_users,chois),
CONSTRAINT fk_users_id FOREIGN KEY (id_users) REFERENCES users(id),
CONSTRAINT fk_flower_name FOREIGN KEY (chois) REFERENCES flower(name)
);
CREATE VIEW cityWithRegion as SELECT city.id,city.name, region.region_name FROM city,region WHERE city.region_id = region.id;