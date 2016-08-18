'use strict';

app.factory('movieServices', function($http, $location, paramServices) {

    return {

        get_url: function() {
            return localStorage.getItem('url');
        },

        set_url: function(id) {
            localStorage.setItem("url", id);
        },

        get_movie_list: function() {
            var $request = $http.get('https://demo2697834.mockable.io/movies');

            return $request.then(function(response){
                return response.data;
            })
        },

        get_history_list: function(){
            var $request = $http({
                method: "POST",
                url: paramServices.baseURL + 'history/get_history_list/',
                data: {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return $request.then(function(response) {
                return response.data;
            });
        },

        save_history: function(movie_id){
            var $request = $http({
                method: "POST",
                url: paramServices.baseURL + 'history/create/',
                data: jQuery.param({
                    movie_id: movie_id
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return $request.then(function(response) {
                return response.data;
            });
        },

        clear_history: function(){
            var $request = $http({
                method: "POST",
                url: paramServices.baseURL + 'history/clear_all/',
                data:{},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    };
});