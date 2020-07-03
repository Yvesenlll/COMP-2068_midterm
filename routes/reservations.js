const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/ReservationsController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  // put your routes here
  router.get('/reservations', index); // this is public
  router.get('/reservations/new', auth, _new);   // this is authenticated
  router.post('/reservations', auth, create);// this is authenticated
  router.post('/reservations/update', auth,  update);// this is authenticated
  router.post('/reservations/delete', auth, _delete);// this is authenticated
  router.get('/reservations/:id/edit', auth, edit);// this is authenticated
  router.get('/reservations/:id', show);// this is public 
};