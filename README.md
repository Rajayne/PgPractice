# PgPractice

npm install pg

PG works like psycopg2 for Python to communicate with postgres database

const {Client} = require("pg");

Must use async await for queries

# SQL Injection

Can use variables in queries but exposes db to SQL Injection, manipulation of query to access hidden information. Prevent by:

- Sanitize inputs with parameterized queries

# Parameterized Queries

1. Represent variables with $ i.e. var1 = $1, var2 = $2
2. SQL statement with second argument pass array of values for variables: (`FROM *... type='$1'`, [type])

# PG versus SQLAlchemy

- PG does not need to commit to database as queries are direct to db.

# Testing

When testing, remember to create test database and to end connection to database after all tests are run to prevent async script from running continuously.

# Seeding database

Opening psql in a directory then using command \i data.sql will seed a database

# One to Many Relationship

Two methods to returning JSON data from two different tables

1. Use two queries, one to select from each table
