const express = require('express');
const router = express.Router();
//const path= require('path'); ///
/*songs */
//const app= express(); ///
const pool=require('../database'); //como ref a la conexion a la DB
//const {isLogedIn, isNotLoggedIn} = require('../lib/auth'); //para proteger, se usa en profile
router.get('/add',(req,res)=>{
    res.render('songs/add');
});
//render == incrusta
router.post('/add',async(req,res)=>{
    console.log('aaah >:v');
    const {name,url,album,description,letra}= req.body;
    //console.log(album);
    const newSong = {
        name,
        url,
        album,
        description,
        letra
    };
    console.log(newSong);  //aaaqui >:v7

    await pool.query('INSERT INTO canciones.songs(name,url,album,letra) values ?',[newSong]); //es como decirle que se espere a que responda pra continuar
//    res.send("<h1>Recibido >:v7</h1><img src='/img/imagen.jpg'>"); 
    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success','link saved successfully ');
    //res.redirect('/songs');// "el redirect funciona como un return no se lee lo que le sigue" by coren
    
});

router.get('/delete/:id',async(req,res)=>{
    const {id} =req.params ;
    await pool.query('DELETE FROM songs WHERE ID =?',[id]);
    req.flash('success','link deleted successfully ');
    res.redirect('/songs');


});
router.get('/edit/:id',async(req,res)=>{ //se muestra en el link 
    const {id} =req.params ;
    const songs = await pool.query('SELECT * FROM canciones.songs WHERE id=?',[id]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un id 
    
    res.render('songs/edit',{song:songs[0]}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :id porque de por si uso edit.hbs y no necesita el id que recbe en la info del link\ 

});
router.post('/edit/:id',async(req,res)=>{ //pasan encriptados
    const {name,url,album,description,etiquetas}= req.body;
    const newSong = {
        name,
        url,
        album,
        description,
        etiquetas
    };
   await pool.query('update canciones.songs set ? where id = ?',[newSong,id]);
   req.flash('success','song saved successfully ');
    res.redirect('/songs');

});

router.get('/',async(req,res)=>{ 
    //const {id} =req.params ;
    const songs = await pool.query('SELECT * FROM canciones.songs'); 
    console.log(songs);
    res.render('songs/list',{songs}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :id porque de por si uso edit.hbs y no necesita el id que recbe en la info del link\ 

});
module.exports = router;
