DROP DATABASE IF EXISTS pgrelationships;
CREATE DATABASE pgrelationships;

\c pgrelationships;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS message_tags CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL
);

CREATE TABLE messages
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users,
  msg TEXT NOT NULL
);

CREATE TABLE tags
(
  code TEXT PRIMARY KEY,
  tag TEXT UNIQUE
);

CREATE TABLE message_tags
(
  message_id INTEGER NOT NULL REFERENCES messages,
  tag_code TEXT NOT NULL REFERENCES tags,
  PRIMARY KEY(message_id, tag_code)
);

INSERT INTO users
  (name, type)
VALUES
  ('Juanita', 'admin'),
  ('David', 'staff'),
  ('Jessica', 'user');


INSERT INTO messages
  (user_id, msg)
VALUES
  (1, 'Hola!'),
  (1, 'Adios!'),
  (2, 'Arigato!');

INSERT INTO tags
VALUES
  ('en', 'English'),
  ('jp', 'Japansese');

INSERT INTO message_tags
VALUES
  (1, 'en'),
  (2, 'en'),
  (3, 'jp');