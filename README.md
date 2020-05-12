OLD README
THIS NEEDS TO BE UPDATED

See README.AWS.md


# fsm-server

> Sports Back End Application

## About


## System Setup

1. Switch to DEV branch.

2. Install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/).

3. Install application dependencies:

```
npm install -g sequelize-cli
npm install
```

4. Install and Setup Database

a) Install

```
brew install postgresql
```

b) Setup
In one terminal, start the database service:
```
./dbstart
```
In a second terminal window, enter the following:
```
createdb `whoami`
psql
```
In the psql shell, enter:
```
CREATE ROLE admin LOGIN PASSWORD 'admin';
CREATE DATABASE fsm_server WITH OWNER = admin;
alter role admin with createdb login;
ALTER DEFAULT PRIVILEGES GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON TABLES TO admin;
\q
```

TODO: the 4th last line (ALTER DEFAULT...) should somewhow to be included in 3rd line. better to alter admin role than default.
get rid of last line once its figured out

c) Initialize DB

```
./dbreset
```

5. Start app

In one terminal, start the database service:
```
./dbstart
```
In a second terminal window, run the backend application:
```
npm start
```

## Testing

```
npm test
```

tests in the `test/` directory will be run.

