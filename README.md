<h2>Simple Media App VOD Application</h2>

<h4>Install Instruction</h4>

- Clone the source code to your /www directory
- Create Database in mysql
- Import sql file from /server/accedo.sql to your database
- Update your database username, password and database name in /server/application/config/database.php
```
'username' => 'your_username',
'password' => 'your_password',
'database' => 'your_database_name',
```
- Update your server url in server side directory: /server/application/config/config.php
```
$config['base_url'] = 'http://your.url/server/';
```
- Update your server url in client side directory: /app/js/services/paramServices.js
```
var serverURL = "http://your.url/server/"; //own server
```
- Access http://your.url/app
- Done
