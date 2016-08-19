<h2>Simple Media App VOD Application</h2>
<hr>
<h4>Install Instruction</h4>

1. Clone the source code to your /www directory
2. Create Database in mysql
3. Import sql file from /server/accedo.sql to your database
4. Update your database username, password and database name in /server/application/config/database.php
```
'username' => 'your_username',
'password' => 'your_password',
'database' => 'your_database_name',
```
5. Update your server url in server side directory: /server/application/config/config.php
```
$config['base_url'] = 'http://your.url/server/';
```
6. Update your server url in client side directory: /app/js/services/paramServices.js
```
var serverURL = "http://your.url/server/"; //own server
```
7. Access http://your.url/app
8. Done
