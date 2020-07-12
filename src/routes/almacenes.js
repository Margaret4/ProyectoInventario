const express = require('express');
const router = express.Router();
const pool=require('../database'); 

router.get('/add',(req,res)=>{
    res.render('almacenes/add');
});
//render == incrusta
router.post('/add',async(req,res)=>{
    console.log('aaah >:v');
    const {name,codigo}= req.body;
    var cod = parseInt(codigo)
    const newAlm = {
        cod,name,dir
        
    };
    console.log(newAlm);  //aaaqui >:v7

    await pool.query('INSERT INTO db_partent.almacen set  ?',[newAlm]); //es como decirle que se espere a que responda pra continuar

    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success','link saved successfully ');
    res.redirect('/almacenes');// "el redirect funciona como un return no se lee lo que le sigue" by coren
    
});

router.get('/delete/:id',async(req,res)=>{
    const {id} =req.params ;
    await pool.query('DELETE FROM db_partent.almacen WHERE ID =?',[id]);
    req.flash('success','link deleted successfully ');
    res.redirect('/almacenes');


});
router.get('/edit/:id',async(req,res)=>{ //se muestra en el link 
    const {id} =req.params ;
    const almacenes = await pool.query('SELECT * FROM almacen WHERE id=?',[id]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un id 
    
    res.render('almacenes/edit',{almacen:almacenes[0]}); 
    console.log(almacen)

});
router.post('/edit/:id',async(req,res)=>{ //pasan encriptados
    const {name,codigo}= req.body;
    const {id} =req.params ;
    var cod = parseInt(codigo);
    const newAlm = {
        cod,name,dir
    };
    console.log("<newAlm>");
    console.log(newAlm);
    console.log("<newAlm>");
    await pool.query('update almacen set ? where id = ?',[newAlm,id]);
    
    req.flash('success','almacen guardado');
    res.redirect('/almacenes');

});

router.get('/',async(req,res)=>{ 
    //const {id} =req.params ;
    const almacenes = await pool.query('SELECT * FROM db_partent.almacen'); 
    console.log(almacenes);
    res.render('almacenes/list',{almacenes}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :id porque de por si uso edit.hbs y no necesita el id que recbe en la info del link\ 

});
module.exports = router;
