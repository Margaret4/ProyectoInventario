const express = require('express');
const router = express.Router();
//const path= require('path'); ///
/*SINGERS */
//const app= express(); ///
const pool=require('../database'); //como ref a la conexion a la DB
//const {isLogedIn, isNotLoggedIn} = require('../lib/auth'); //para proteger, se usa en profile
router.get('/add',(req,res)=>{
    res.render('links/add');
});
//render == incrusta
router.post('/add',async(req,res)=>{
    const {name,description}= req.body;
    const newSinger = {
        name,
        description,
    };
    await pool.query('INSERT INTO canciones.singers set?',[newSinger]); //es como decirle que se espere a que responda pra continuar
//    res.send("<h1>Recibido >:v7</h1><img src='/img/imagen.jpg'>"); 
    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success','link saved successfully ');
    res.redirect('/links');// "el redirect funciona como un return no se lee lo que le sigue" by coren
    
});

router.get('/delete/:id',async(req,res)=>{
    const {id} =req.params ;
    await pool.query('DELETE FROM singers WHERE ID =?',[id]);
    req.flash('success','link deleted successfully ');
    res.redirect('/links');


});
router.get('/edit/:id',async(req,res)=>{ //se muestra en el link 
    const {id} =req.params ;
    const singers = await pool.query('SELECT * FROM canciones.singers WHERE id=?',[id]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un id 
    
    res.render('links/edit',{singer:singers[0]}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :id porque de por si uso edit.hbs y no necesita el id que recbe en la info del link\ 

});
router.post('/edit/:id',async(req,res)=>{ //pasan encriptados
    const {id} =req.params ;
    const {name,description} = req.body;
    const newSinger = {
        name,
        description,
    };
   await pool.query('update canciones.singers set ? where id = ?',[newSinger,id]);
   req.flash('success','singer saved successfully ');
    res.redirect('/links');

});

router.get('/',async(req,res)=>{ 
    //const {id} =req.params ;
    const singers = await pool.query('SELECT * FROM canciones.singers'); 
    console.log(singers);
    res.render('links/list',{singers}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :id porque de por si uso edit.hbs y no necesita el id que recbe en la info del link\ 

});
module.exports = router;