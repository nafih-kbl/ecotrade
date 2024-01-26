var express = require('express');
var router = express.Router();
const passport=require('passport');
require('../config/passportConfig');

router.use(passport.initialize());
router.use(passport.session());
const {createUser,
    googleUser,
    getAllUser,
    logInUser,
    getSingleUSer,
    deleteAuser,
    updtateUser,
    blockUser,
    unblockUser}=require('../controller/userController')
/* GET users listing. */
router.get('/',(req,res)=>{
    res.render('index');
});
router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/user/create-user-with-google',
        failureRedirect: '/'
}));
router.post('/create-user',createUser);
router.get('/create-user-with-google',googleUser);
router.post('/logIn-user',logInUser);
router.get('/get-all-users',getAllUser);
router.get('/get-single-user/:id',getSingleUSer);
router.delete('/delete-user/:id',deleteAuser);
router.put('/update-user/:id',updtateUser);
router.put('/block-user/:id',blockUser);
router.put('/unblock-user/:id',unblockUser);

module.exports = router;
