-- Optional: clean slate
DROP TABLE IF EXISTS package_sensors CASCADE;
DROP TABLE IF EXISTS sensor_reading CASCADE;
DROP TABLE IF EXISTS delivery_point CASCADE;
DROP TABLE IF EXISTS Paket CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  password VARCHAR,
  user_name VARCHAR,
  role VARCHAR
);

-- DRIVERS
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  truck_id INTEGER,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  location TEXT
);

-- DELIVERY POINT
CREATE TABLE IF NOT EXISTS delivery_point (
  address VARCHAR,
  postnummer VARCHAR,
  city VARCHAR,
  parcel_id INTEGER PRIMARY KEY
);

-- SENSOR READING
CREATE TABLE IF NOT EXISTS sensor_reading (
  id SERIAL PRIMARY KEY,
  package_id INTEGER,
  sensor_id INTEGER,
  temperature INTEGER,
  humidity INTEGER,
  timestamp DATE
);

-- PAKET
CREATE TABLE IF NOT EXISTS package (
  paket_id SERIAL PRIMARY KEY,
  sender VARCHAR,
  sender_id INTEGER,
  receiver_id VARCHAR,
  receiver_num INTEGER,
  drive_start DATE,
  truck_id INTEGER,
  sensor_id INTEGER,
  temperature NUMERIC,
  humidity NUMERIC,
  sensor_timestamp NUMERIC,
  parcel_id INTEGER REFERENCES delivery_point(parcel_id),
  sensor_reading_id INTEGER REFERENCES sensor_reading(id)
);

-- PACKAGE SENSORS
CREATE TABLE IF NOT EXISTS package_sensors (
  id SERIAL PRIMARY KEY,
  paket_id INTEGER,
  temperature INTEGER,
  humidity INTEGER,
  FOREIGN KEY (paket_id) REFERENCES Paket(paket_id)
);
