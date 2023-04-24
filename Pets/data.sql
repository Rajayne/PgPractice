DROP DATABASE IF EXISTS petsdb;
CREATE DATABASE petsdb;

\c petsdb;

CREATE TABLE cats
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    age integer
);

CREATE TABLE dogs
(
    id SERIAL PRIMARY KEY NOT NULL,
    name text NOT NULL,
    age integer
);

INSERT INTO cats
  (name, age)
VALUES
  ('Fluffy', 7),
  ('Madame Meow', 9),
  ('Pawsley', 2);

INSERT INTO dogs
  (name, age)
VALUES
  ('Whiskey', 6),
  ('Woofles', 3);
  