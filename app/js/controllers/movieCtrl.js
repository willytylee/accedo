'use strict';
app.controller('movieCtrl', function($sce, $rootScope, $scope, $route, $location, $templateCache, movieServices) {

    var num_of_movie = 0;

    $scope.get_movie_page = function(movie_id, url) {
        movieServices.set_url(url);
        movieServices.save_history(movie_id);
        $location.path('/movie_info');
    };

    $scope.get_movie_list = function() {
        
        movieServices.get_movie_list().then(function(response) {
            $scope.list = response.entries;
            $scope.chunkedData = chunk(response.entries, 2);
            num_of_movie = response.entries.length;
        });
    };

    $scope.get_history_list = function(){


        movieServices.get_history_list().then(function(response) {
            $scope.history_array = [];

            for (var i = 0; i < response.length; i++) {
                $scope.history_array.push(response[i].movie_id);
            }

            num_of_movie = response.length;

            movieServices.get_movie_list().then(function(response) {
                $scope.list = [];
                $scope.chunkedData = [];
                for (var i = 0; i < response.entries.length; i++) {
                    if ($.inArray(response.entries[i].id, $scope.history_array) != -1){
                        $scope.list.push(response.entries[i]);    
                    }
                }
                $scope.chunkedData = chunk($scope.list, 2);
            });
        });
    }

    $scope.get_movie_info = function(){

        var videoUrl = movieServices.get_url()
    	$scope.url = $sce.trustAsResourceUrl(videoUrl);
    }

    $scope.clear_history = function(){

        movieServices.clear_history();
    }

    $scope.keyPressed = function(e) {
        if (e.keyCode == 13){
            if ($(window).width() > 767){
                var url = $('.swiper-slide-active').children('img').attr('url');    
                var movie_id = $('.swiper-slide-active').children('img').attr('movie_id');    
            }else{
                var url = $('.image-active').children('img').attr('url');
                var movie_id = $('.image-active').children('img').attr('movie_id');
            }
            $scope.get_movie_page(movie_id, url);
        }else if (e.keyCode == 37){
            if ($scope.id >= 1){
                $scope.id -= 1;
            }
        }else if (e.keyCode == 38){
            if ($scope.id >= 2){
                $scope.id -= 2;
            }
        }else if (e.keyCode == 39){
            if ($scope.id <= (num_of_movie - 2)){
                $scope.id += 1;
            }
        }else if (e.keyCode == 40){
            if ($scope.id <= (num_of_movie - 3)){
                $scope.id += 2;
            }
        }

    };

    $scope.$on('ngRepeatFinished', function() {
        var slidesPerView1, slidesPerView2;

        if (num_of_movie < 7){
            slidesPerView1 = num_of_movie;
        }else{
            slidesPerView1 = 7;
        }

        if (num_of_movie < 5){
            slidesPerView2 = num_of_movie;
        }else{
            slidesPerView2 = 5;
        }

        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: slidesPerView1,
            loop: true,
            paginationClickable: true,
            spaceBetween: 30,
            keyboardControl: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            breakpoints: {
            1024: {
                slidesPerView: slidesPerView2,
                spaceBetween: 30
            },
        }
        });
    });

    $("video").bind("ended", function() {
        movieServices.save_history().then(function(response){
            window.history.back();
        })
    });

    
});

app.directive('endRepeat', ['$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    }
]);

app.directive('shortcut', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        link: function postLink(scope, iElement, iAttrs){
            $(document).on('keydown', function(e){
                scope.$apply(scope.keyPressed(e));
                if ($(".image-active").is(":visible")){
                    $('html, body').animate({scrollTop: $(".image-active").offset().top}, 100);
                }
            });
        }
    };
});

function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
    }
    return newArr;
}