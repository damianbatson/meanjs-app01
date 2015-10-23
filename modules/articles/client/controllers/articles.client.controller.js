'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$timeout', '$upload', '$window', '$stateParams', '$location', 'Authentication', 'Articles',
	function ($scope, $timeout, $upload, $window, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;
		$scope.article = Articles;
		$scope.fileReaderSupported = window.FileReader !== null;


 $scope.create = function(picFile) {
		console.log('create');
		console.log(picFile);
        var article = new Articles({
            title: this.title,
            content: this.content,
            image: null
        });

		console.log(article);
		$upload.upload({
            url: 'api/articles', 
            method: 'POST', 
            headers: {'Content-Type': 'multipart/form-data'},
            fields: {article: article},
            file: picFile,               
		}).progress(function(event) {
		$scope.uploadProgress = Math.floor(event.loaded / event.total);
		// $scope.$apply();
		}).success(function (data, status, headers, config, response) {
			$location.path('articles');

	        $scope.title = '';
	        $scope.content = '';
		// AlertService.success('Photo uploaded!');
		}).error(function (err) {
		$scope.uploadInProgress = false;
		// AlertService.error('Error uploading file: ' + err.message || err);
		});

    };

    $scope.doTimeout = function(file) {
         console.log('do timeout');
        $timeout( function() {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
             console.log('read');
                fileReader.onload = function(e) {
                    $timeout(function() {
                        file.dataUrl = e.target.result;
                         console.log('set url');
                    });
                };
            });
    };


    $scope.generateThumb = function(file) {
        console.log('generate Thumb');
    if (file) {
        console.log('not null');
         console.log(file);
        if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
            $scope.doTimeout(file);
          }
      }
   };


		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);