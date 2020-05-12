There are 3 database users defined:

1) superadmin
has all access granted and should be used by DBA to alter DML objects

2) admin
is used in the connection string by OLD FSM admin web application.

3) fsm
is used by iOS application to connect to the database

admin and fsm have restricted security permissions to allow them to perform ONLY the database operations required by the applications they serve. They cannot DROP tables, for example.

To init the database please read README.dbinit.md