const passport=require('passport')
const Strategy= require('passport-local').Strategy;

const pool = require('../database');
const helpers=require('../lib/helpers');
passport.use('local.signin',new Strategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async(req,username,password,done)=>{
        const rows = await pool.query('select * from users where username = ?',[username]);
        if(rows.length>0){
            console.log(rows[0]);
            const user =rows[0];
            const validPassword = await helpers.matchPassword(password,user.password);
            if(validPassword){
                done(null,user,req.flash('success','Welcome'+user.username)); //se dice el tipo de flash
            }else{
                console.log('nel');
                done(null,false,req.flash('message','Incorrect password'));
            }

        }
        else{
            console.log('no existe');
            return done(null,false,req.flash('message','The Username does not exists'));
        }
}));
passport.use('local.signup', new Strategy({
    usernameField:'username',
    passwordField: 'password',
    passReqToCallback: true
    //si quieres agregar mas 
}, async(req,username,password,done)=>{ //le callback
    const {fullname}=req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?',[newUser])
    newUser.id = result.insertId;
    return done (null,newUser);

}));


passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async(id,done)=>{
    const rows= await pool.query('SELECT * FROM users WHERE id =?',[id]);
    done(null,rows[0]);
});