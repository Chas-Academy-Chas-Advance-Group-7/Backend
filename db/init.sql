CREATE TABLE users (
  "id" integer PRIMARY KEY,
  "email" varchar,
  "password" varchar,
  "user_name" varchar,
  "role" varchar
);

CREATE TABLE drivers (
  "id" integer PRIMARY KEY,
  "truck_id" integer,
  "name" varchar,
  "email" varchar,
  "password" varchar,
  "location" string
);

CREATE TABLE Paket (
  "paket_id" integer PRIMARY KEY,
  "sender" varchar,
  "sender_id" integer,
  "receiver_id" varchar,
  "receiver_num" integer,
  "drive_start" Date,
  "truck_id" integer,
  "sensor_id" integer,
  "temperature" number,
  "humidity" number,
  "sensor_timestamp" number
);

CREATE TABLE delivery_point (
  "address" VARCHAR,
  "postnummer" VARCHAR,
  "city" VARCHAR,
  "parcel_id" integer
);

CREATE TABLE package_sensors (
  "id" integer PRIMARY KEY,
  "paket_id" integer,
  "temperature" integer,
  "humidity" integer
);

CREATE TABLE sensor_reading (
  "id" integer PRIMARY KEY,
  "package_id" integer,
  "sensor_id" integer,
  "temperature" integer,
  "humidity" integer,
  "timestamp" date
);

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "Paket" ("receiver_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "Paket" ("sender_id");

ALTER TABLE "Paket" ADD FOREIGN KEY ("paket_id") REFERENCES "delivery_point" ("parcel_id");

ALTER TABLE "Paket" ADD FOREIGN KEY ("paket_id") REFERENCES "sensor_reading" ("package_id");

ALTER TABLE "package_sensors" ADD FOREIGN KEY ("paket_id") REFERENCES "sensor_reading" ("sensor_id");
