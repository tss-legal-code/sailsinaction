module.exports.routes = {

  /*************************************************************
   * JSON API *
   *************************************************************/

  'PUT /login': 'UserController.login',
  'GET /logout': 'UserController.logout',

  'GET /video': 'VideoController.find',
  'POST /video': 'VideoController.create',
  'POST /user/signup': 'UserController.signup',
  'PUT /user/removeProfile': 'UserController.removeProfile',
  'PUT /user/restoreProfile': 'UserController.restoreProfile',
  'PUT /user/restoreGravatarURL': 'UserController.restoreGravatarURL',
  'PUT /user/updateProfile/:id': 'UserController.updateProfile',
  'PUT /user/changePassword': 'UserController.changePassword',
  'GET /user/adminUsers': 'UserController.adminUsers',
  'PUT /user/updateAdmin/:id': 'UserController.updateAdmin',
  'PUT /user/updateBanned/:id': 'UserController.updateBanned',
  'PUT /user/updateDeleted/:id': 'UserController.updateDeleted',
  // 'GET /user/preview-profile/:id': 'UserController.previewProfile',

  /*************************************************************
   * Server-rendered HTML Pages                                *
   *************************************************************/


  'GET /': 'PageController.showHomePage',

  // 'GET /': {
  //   view: "homepage",
  //   locals: {
  //     me: {
  //       id: null,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com'
  //     }
  //   }
  // }
  // ,
  // // 'GET /': {
  // //
  // // },

  'GET /videos': 'PageController.showVideosPage',
  // 'GET /videos': {
  //   view: 'videos',
  //   locals: {
  //     me: null
  //   }
  // }

  'GET /profile': 'PageController.showProfilePage',
  // 'GET /profile': {
  //   view: 'profile',
  //   locals: {
  //     me: {
  //       id: 1,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com',
  //       username: 'sails-in-action'
  //     }
  //   }
  // }
  // ,

  'GET /edit-profile': 'PageController.showEditProfilePage',
  // 'GET /edit-profile': {
  //   view: 'edit-profile',
  //   locals: {
  //     me: {
  //       id: 1,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com',
  //       username: 'sails-in-action'
  //     }
  //   }
  // }
  // ,


  'GET /signup': 'PageController.showSignupPage',
  // 'GET /signup': {
  //   view: 'signup',
  //   locals: {
  //     me: {
  //       id: null,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com'
  //     }
  //   }
  // }
  // ,


  'GET /restore-profile': 'PageController.showRestorePage',
  // 'GET /restore-profile': {
  //   view: 'restore-profile',
  //   locals: {
  //     me: {
  //       id: null,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com'
  //     }
  //   }
  // }
  // ,


  'GET /administration': 'PageController.showAdminPage',
  // 'GET /administration': {
  //   view: 'adminUsers',
  //   locals: {
  //     me: {
  //       id: 1,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com',
  //     }
  //   }
  // }

  'GET /preview-profile/:pid': 'PageController.previewProfilePage',

}
;
