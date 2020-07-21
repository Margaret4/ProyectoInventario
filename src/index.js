const express = require('express');
//const morgan= require('morgan');
const exphbs=require('express-handlebars');
const path= require('path');
const flash = require('connect-flash');
const session= require('express-session');
const MySQLStore= require('express-mysql-session');
const {database }=require('./keys');
const passport=require('passport');
//Initializations 
const app = express();
//require('./lib/passport');
//settings
app.set('port',process.env.PORT || 4000);
//un puerto en el ambiente o 4000
app.set('views', path.join(__dirname,'views')); //aqui le decimos donde va a estar nuestra carpeta de views
//ya que por defecto no estario dentro de otro dir
app.engine('.hbs',exphbs({  //se define la var exphbs, objeto con cualidades que hay que definir y que tiene que ser recibido por el motor
    defaultLayout: 'main',//
    layoutsDir: path.join(app.get('views'),'layouts'), //pensamiento filo. el get como un diccionario
    partialsDir:  path.join(app.get('views'),'partials'), //trozos de codigo :v
    extname: '.hbs',//que nombre tendran los archivos
    helpers: require('./lib/handlebars') //par que todo funcione usare funciones que estaran en el lib
}));//y ya lo configurarmos

app.set('view engine', '.hbs');// para usarlo
//Middlewares //muestra por consola las peticiones que van llegando

app.use(session({
    secret: 'adivinasession',
    resave: '.hbs',
    saveUninitialized: false,
    store: new MySQLStore(database)

}));
app.use(flash()); //para usar mensajes
//app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//para poder aceptar los datos que me envien los usuarios, de esta forma solo acepto string no imgs
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

///------------------------------Global var
//todas las vistas para la autentificacion necesitan reconocer listas algo asi
app.use((req,res,next)=> {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user; //y asi el user se guarda en la session
    next();//toma la ifo del usuario, lo que el servidor responde,toma ua fucio para contiuar co el resto del codigo
})
//  Routes
app.use(require('./routes'));
//app.use(require('./routes/authentication'));
//app.use('/singers',require('./routes/links'));

//app.use('/songs',require('./routes/songs'));
app.use('/proveedores',require('./routes/proveedores'));
app.use('/almacenes',require('./routes/almacenes'));
app.use('/articulos',require('./routes/articulos'));
app.use('/parteEntrada',require('./routes/parteEntrada'));
app.use('/detalle',require('./routes/detalle'));
//public 
app.use(express.static(path.join(__dirname,'public'))) //
//Starting the server

app.listen(app.get('port'), ()=> {
    console.log('Server on port ',app.get('port'));
});