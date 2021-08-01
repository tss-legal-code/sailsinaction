angular.module('brushfire').controller('signupPageController', ['$scope', '$http', function ($scope, $http) {

  //removed toastr because of not working ^_^
  // angular.module('brushfire').controller('signupPageController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {

  // set-up loading state
  $scope.signupForm = {
    loading: false
  };

  $scope.submitSignupForm = function () {

    // Set the loading state (i.e. show loading spinner)
    $scope.signupForm.loading = true;

    // // Submit a POST request to Sails. [The signup action has been created.]
    // $http.post('/user/signup', {

    // Submit a POST request to /user [This is using blueprints.]
    $http.post('/user/signup', {
      email: $scope.signupForm.email,
      username: $scope.signupForm.username.replace(/\s+/g, '-'),
      password: $scope.signupForm.password
    })
      .then(function onSuccess(sailsResponse) {

        // Redirect to the profile page [This is after we have a profile page built]
        // window.location = '#/profile/' + sailsResponse.data.id;

        // Redirect to the user blueprint record [This is before we have the profile page built]
        // window.location = '/user/' + sailsResponse.data.id;
        window.location = '#/profile/' + sailsResponse.data.id;
      })
      .catch(function onError(sailsResponse) {

        console.log("sailsResponse.data: "+ sailsResponse.data + "\nsailsResponse.status:  "  + sailsResponse.status)


        // Handle known error type(s).
        if (sailsResponse.status == 409) {
          // toastr.error(sailsResponse.data);

          // i am not failing alone with toastr!!! see:
          // https://stackoverflow.com/questions/41796144/sailsjs-angular-toastr-error

          $scope.signupForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

          return;
        };

        // from book... does not work ^_^
        // if (sailsResponse.data.invalidAttributes) {
        //   $scope.signupForm.errorMsg = 'An unexpected error occurred: (type2)' + (JSON.stringify(sailsResponse.data.invalidAttributes));
        //   return;
        // }


        // Handle unknown error type(s).

        $scope.signupForm.errorMsg = 'An unexpected error occurred: ' + (JSON.stringify(sailsResponse.data) || JSON.stringify(sailsResponse.status));

      })
      .finally(function eitherWay() {
        $scope.signupForm.loading = false;
      });
  };
}]);

// error is :
//   {
//   "originalError": {
//     "name": "error",
//     "length": 312,
//     "severity": "ОШИБКА",
//     "code": "23505",
//     "detail": "Ключ \"(email)=(sailsinaction@gmail.com)\" уже существует.",
//     "schema": "public",
//     "table": "user",
//     "constraint": "user_email_key",
//     "file": "nbtinsert.c",
//     "line": "433",
//     "routine": "_bt_check_unique"
//   }
//   ,
//   "_e": {
//     "name": "error",
//     "length": 312,
//     "severity": "ОШИБКА",
//     "code": "23505",
//     "detail": "Ключ \"(email)=(sailsinaction@gmail.com)\" уже существует.",
//     "schema": "public",
//     "table": "user",
//     "constraint": "user_email_key",
//     "file": "nbtinsert.c",
//     "line": "433",
//     "routine": "_bt_check_unique"
//   }
//   ,
//   "rawStack": "error: повторяющееся значение ключа нарушает ограничение уникальности \"user_email_key\"\n at Connection.parseE (D:\\code\\lib\\111\\brushfire-ch6-start\\node_modules\\sails-postgresql\\node_modules\\pg\\lib\\connection.js:539:11)\n at Connection.parseMessage (D:\\code\\lib\\111\\brushfire-ch6-start\\node_modules\\sails-postgresql\\node_modules\\pg\\lib\\connection.js:366:17)\n at Socket.<anonymous> (D:\\code\\lib\\111\\brushfire-ch6-start\\node_modules\\sails-postgresql\\node_modules\\pg\\lib\\connection.js:105:22)\n at emitOne (events.js:77:13)\n at Socket.emit (events.js:169:7)\n at readableAddChunk (_stream_readable.js:153:18)\n at Socket.Readable.push (_stream_readable.js:111:10)\n at TCP.onread (net.js:529:20)",
//   "details": "Details: error: повторяющееся значение ключа нарушает ограничение уникальности \"user_email_key\"\n",
//   "message": "[Error (E_UNKNOWN) Encountered an unexpected error] Details: error: повторяющееся значение ключа нарушает ограничение уникальности \"user_email_key\"\n",
//   "stack": "Error (E_UNKNOWN) :: Encountered an unexpected error\nerror: повторяющееся значение ключа нарушает ограничение уникальности \"user_email_key\"\n at Connection.parseE (D:\\code\\lib\\111\\brushfire-ch6-start\\node_modules\\sails-postgresql\\node_modules\\pg\\lib\\connection.js:539:11)\n at Connection.parseMessage (D:\\code\\lib\\111\\brushfire-ch6-start\\node_modules\\sails-postgresql\\node_modules\\pg\\lib\\connection.js:366:17)\n at Socket.<anonymous> (D:\\code\\lib\\111\\brushfire-ch6-start\\node_modules\\sails-postgresql\\node_modules\\pg\\lib\\connection.js:105:22)\n at emitOne (events.js:77:13)\n at Socket.emit (events.js:169:7)\n at readableAddChunk (_stream_readable.js:153:18)\n at Socket.Readable.push (_stream_readable.js:111:10)\n at TCP.onread (net.js:529:20)"
// }





// angular.module('brushfire').controller('signupPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

//   // set-up loading state
//   $scope.signupForm = {
//     loading: false
//   };

//   $scope.submitSignupForm = function(){

//     // Set the loading state (i.e. show loading spinner)
//     $scope.signupForm.loading = true;

//     // Submit a POST request to /user [This is using blueprints.]
//     // $http.post('/user', {

//     // Submit a POST request to Sails. [The signup action has been created.]
//     $http.post('/user/signup', {
//       email: $scope.signupForm.email,
//       username: $scope.signupForm.username.replace(/\s+/g, '-'),
//       password: $scope.signupForm.password
//     })
//     .then(function onSuccess(sailsResponse){

//       // Redirect to the profile page [This is after we have a profile page built]
//       // window.location = '#/profile/' + sailsResponse.data.id;
//       window.location = '/profile';
      
//       // Redirect to the user blueprint record [This is before we have the profile page built]
//       // window.location = '/user/' + sailsResponse.data.id;
//     })
//     .catch(function onError(sailsResponse){

//     // Handle known error type(s).
//     if (sailsResponse.status == 409) {
//       toastr.error(sailsResponse.data);
//       $scope.signupForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);
//       return;
//     }

//     // Handle unknown error type(s).
//     $scope.signupForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

//     })
//     .finally(function eitherWay(){
//       $scope.signupForm.loading = false;
//     });
//   };

// }]);
