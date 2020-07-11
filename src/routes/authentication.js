/*const express = require('express');
const router = express.Router();

const passport=require('passport');

const {isLogedIn, isNotLoggedIn} = require('../lib/auth'); //para proteger, se usa en profile

router.get('/signup',isNotLoggedIn,(req,res)=>{
    res.render('auth/signup')
});
router.post('/signup',isNotLoggedIn,passport.authenticate('local.signup',{
    successRedirect:'/profile',
    failureRedirec: '/signup',
    failureFlash:true

}));

router.get('/profile',isLogedIn,(req,res)=>{
    res.render('./profile'); //para que sepa que esta en view le aclaro con un puntito :vv

})

router.get('/signin',isNotLoggedIn,(req,res)=>{
    res.render('auth/signin');

});

router.post('/signin',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});

router.get('/logout',isLogedIn,(req,res)=>{ //ejemplo solo si estas logueado puedes logout 
    req.logOut();
res.redirect('/signin');

});
module.exports = router;
*/