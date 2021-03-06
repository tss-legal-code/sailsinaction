/**
 * Created by nitro on 28.07.2021.
 */
module.exports = function isLoggedOut(req, res, next) {

  if (!req.session.userId) {
    return next();
  }

  if (req.wantsJSON) {
    return res.forbidden('You are not permitted to perform this action.');
  }

  return res.redirect('/');
};
