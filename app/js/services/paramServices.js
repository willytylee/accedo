'use strict';
app.factory('paramServices', function($http, $location) {

    var serverURL = "http://accedo.willytylee.com/server/"; //own server
    
    var baseURL = serverURL + "index.php/"

    return {
        baseURL: baseURL,
        serverURL: serverURL
    }
});
