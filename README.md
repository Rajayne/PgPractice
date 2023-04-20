# PgPractice
npm install pg

PG works like psycopg2 for Python to communicate with postgres database

const {Client} = require("pg");

Must use async await for queries

# SQL Injection
Can use variables in queries but exposes db to SQL Injection, manipulation of query to access hidden information.  Prevent by:
-  Sanitize inputs with parameterized queries

# Parameterized Queries
1. Represent variables with $ i.e. var1 = $1, var2 = $2
2. SQL statement with second argument pass array of values for variables: (`FROM *... type='$1'`, [type])