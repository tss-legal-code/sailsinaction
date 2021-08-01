/**
 * PageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  showHomePage: function (req, res) {

    console.log('req.session.userId: ', req.session.userId);

    if (!req.session.userId) {
      return res.view('homepage', {
        me: null,
      });
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage', {
          me: null
        });
      }

      return res.view('homepage', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },


  showVideosPage: function (req, res) {

    if (!req.session.userId) {
      return res.view('videos', {
        me: null
      });
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('videos', {
          me: null
        });
      }

      return res.view('videos', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },
  showAdminPage: function (req, res) {
    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function (err, user) {

      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      if (user.admin) {
        return res.view('adminUsers', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      } else {
        return res.view('homepage', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      }
    });
  },

  showProfilePage: function (req, res) {

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        console.log('error: ', error);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('profile', {
        me: {
          id: user.id,
          email: user.email,
          aboutmyself: user.aboutmyself,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },


  showEditProfilePage: function (req, res) {

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function (err, user) {
      if (err) {
        console.log('error: ', error);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('edit-profile', {
        me: {
          id: user.id,
          email: user.email,
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  showRestorePage: function (req, res) {
    if (req.session.userId) {
      return res.redirect('/');
    }

    return res.view('restore-profile', {
      me: null
    });
  },

  showSignupPage: function (req, res) {
    if (req.session.userId) {
      return res.redirect('/');
    }

    return res.view('signup', {
      me: null
    });
  },


  previewProfilePage: function (req, res) {

    if (!req.param.pid) {
      // return res.redirect('/');
      sails.log.verbose('Preview-user-id not defined');
    }

    User.findOne(req.param.pid, function (err, previewedUser) {
      if (err) {
        console.log('error: ', error);
        return res.negotiate(err);
      }

      // if (!user) {
      //   sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
      //   return res.view('homepage');
      // }

      return res.view('preview-profile', {
        me: {
          preview: {
            id: previewedUser.id,
            email: previewedUser.email,
            aboutmyself: previewedUser.aboutmyself,
            gravatarURL: previewedUser.gravatarURL,
          },
          id: req.session.userId,
        }
      });
    });
  },

};

