-- Optional: clean slate
DROP TABLE IF EXISTS package_sensors CASCADE;
DROP TABLE IF EXISTS sensor_reading CASCADE;
DROP TABLE IF EXISTS delivery_point CASCADE;
DROP TABLE IF EXISTS package CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT,
  password TEXT,
  user_name TEXT,
  role TEXT
);

-- DRIVERS
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  truck_id INTEGER,
  name TEXT,
  email TEXT,
  password TEXT,
  location TEXT
);

-- DELIVERY POINT
CREATE TABLE IF NOT EXISTS delivery_point (
  address TEXT,
  postnummer TEXT,
  city TEXT,
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

-- PACKAGE
CREATE TABLE IF NOT EXISTS package (
  package_id SERIAL PRIMARY KEY,
  sender TEXT,
  sender_id INTEGER,
  receiver_id TEXT,
  receiver_num INTEGER,
  drive_start DATE,
  truck_id INTEGER,
  sensor_id INTEGER,
  temperature NUMERIC,
  humidity NUMERIC,
  sensor_timestamp NUMERIC,
  parcel_id INTEGER REFERENCES delivery_point(parcel_id) ON DELETE SET NULL,
  sensor_reading_id INTEGER REFERENCES sensor_reading(id) ON DELETE SET NULL
);

-- PACKAGE SENSORS
CREATE TABLE IF NOT EXISTS package_sensors (
  id SERIAL PRIMARY KEY,
  package_id INTEGER,
  temperature INTEGER,
  humidity INTEGER,
  FOREIGN KEY (package_id) REFERENCES package(package_id) ON DELETE CASCADE
);
