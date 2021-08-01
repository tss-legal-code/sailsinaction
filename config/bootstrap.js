/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

  // Return the number of records in the video model
  Video.count().exec(function (err, numVideos) {
    if (err) {
      return cb(err);
    }

    // If there's at least one log the number to the console.
    if (numVideos > 0) {
      // return cb();
      return createTestUsers();
    }

    // Add machinepack-youtube as a depedency
    var Youtube = require('machinepack-youtube');

    // List Youtube videos which match the specified search query.
    Youtube.searchVideos({
      query: 'funny cats',
      apiKey: sails.config.credentials.google.apiKey,
      limit: 15,
    }).exec({
      // An unexpected error occurred.
      error: function (err) {
        console.log('the error', err);

      },
      // OK.
      success: function (foundVideos) {
        _.each(foundVideos, function (video) {
          video.src = 'https://www.youtube.com/embed/' + video.id;
          delete video.description;
          delete video.publishedAt;
          delete video.id;
          delete video.url;
        });

        Video.create(foundVideos).exec(function (err, videoRecordsCreated) {
          if (err) {
            return cb(err);
          }
          // return cb();
          return createTestUsers();
        });
      },
    });
  });

  function createTestUsers() {
    var Passwords = require('machinepack-passwords');
    var Gravatar = require('machinepack-gravatar');

    var listOfTestUsers = [
      {name: "sailsinaction", admin: true},
      {name: "andreas", admin: true},
      {name: "hulios", admin: false},
      {name: "serhio", admin: false},
      {name: "margarite", admin: false},
      {name: "clementina", admin: false},
      {name: "erich.maria.remark", admin: false},
      {name: "velkepluma", admin: false},
      {name: "pablos", admin: true},
      {name: "gonsalez", admin: false},
    ];

    listOfTestUsers.forEach(function (elem) {

      var currentName = elem.name;
      var currentEmail = elem.name + "@gmail.com";
      var currentAdmin = elem.admin;

      User.findOne({
        email: currentEmail
      }).exec(function (err, foundUser) {
        if (foundUser) return;
        Passwords.encryptPassword({
          password: 'asdasd',
        }).exec({
          error: function (err) {
            return cb(err);
          },
          success: function (result) {

            var options = {};
            try {
              options.gravatarURL = Gravatar.getImageUrl({
                emailAddress: currentEmail
              }).execSync();
            } catch (err) {
              return cb(err);
            }

            options.email = currentEmail;
            options.encryptedPassword = result;
            options.username = currentName;
            options.aboutmyself = 'Это тестовый аккаунт';
            // Это тестовый аккаунт супер-мега-недо-админа. Он может "выстрелить себе в ногу", т.е. лишить сам себя статуса админа (в т.ч. и всех остальных админов) :)
            options.deleted = false;
            options.admin = currentAdmin;
            options.banned = false;
            User.create(options).exec(function (err, createdUser) {
              if (err) {
                return cb(err);
              }
            })
            // });
          }
        })
      });
    });
    return cb();
  }
};

// function createTestUsers() {
//
//   var Passwords = require('machinepack-passwords');
//   var Gravatar = require('machinepack-gravatar');
//
//   User.findOne({
//     email: 'sailsinaction@gmail.com'
//   }).exec(function (err, foundUser) {
//     if (foundUser) {
//       return cb();
//     }
//
//     Passwords.encryptPassword({
//       password: 'asdasd',
//     }).exec({
//       error: function (err) {
//         return cb(err);
//       },
//       success: function (result) {
//
//         var fake_users = [
//           {name: "sailsinaction", admin: true},
//           {name: "andreas", admin: true},
//           {name: "hulio", admin: false},
//           {name: "serhio", admin: false},
//           {name: "pablos", admin: true},
//           {name: "gonsalez", admin: false}];
//
//         fake_users.forEach(
//
//         var options = {};
//
//         try {
//           options.gravatarURL = Gravatar.getImageUrl({
//             emailAddress: elem.name + "@gmail.com";
//           }).execSync();
//
//         } catch (err) {
//           return cb(err);
//         }
//
//         options.email = elem.name + "@gmail.com";
//         options.encryptedPassword = result;
//         options.username = 'sailsinaction';
//         options.aboutmyself = 'Это аккаунт супер-мега-недо-админа. Он может "выстрелить себе в ногу", т.е. лишить сам себя статуса админа (в т.ч. и всех остальных админов) :))';
//         options.deleted = false;
//         options.admin = elem.admin;
//         options.banned = false;
//         User.create(options).exec(function (err, createdUser) {
//           if (err) {
//             return cb(err);
//           }
//           return cb();
//         });
//       })
//         ;
//
//
//       };
//   })
//     ;
//   });
// },

