const express = require('express');
const router = express.Router();
const pool=require('../database'); 

router.get('/add',(req,res)=>{
    res.render('proveedores/add');
});
//render == incrusta
router.post('/add',async(req,res)=>{
    console.log('aaah >:v');
    const {name,codigo}= req.body;
    cod = parseInt(codigo)
    const newProv = {
        cod,name
        
    };
    console.log(newProv);  //aaaqui >:v7

    await pool.query('INSERT INTO db_partent.proveedor set  ?',[newProv]); //es como decirle que se espere a que responda pra continuar

    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success','link saved successfully ');
    res.redirect('/proveedores');// "el redirect funciona como un return no se lee lo que le sigue" by coren
    
});

router.get('/delete/:cod',async(req,res)=>{
    const {cod} =req.params ;
    await pool.query('DELETE from db_partent.proveedor WHERE cod =?',[cod]);
    req.flash('success','link deleted successfully ');
    res.redirect('/proveedores');


});
router.get('/edit/:cod',async(req,res)=>{ //se muestra en el link 
    const {cod} =req.params ;
    const proveedores = await pool.query('SELECT * FROM proveedores WHERE cod=?',[cod]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un cod 
    
    res.render('proveedores/edit',{proveedor:proveedores[0]}); 
    console.log(proveedor)

});
router.post('/edit/:cod',async(req,res)=>{ //pasan encriptados
    const {name,codigo}= req.body;
    const {cod} =req.params ;
    /*console.log("<req.body>");
    console.log(req.body);
    console.log("<req.body>");
    console.log("<req.params>");
    console.log(req.params);
    console.log("</req.params>");*/
    cod = parseInt(codigo);
    const newProv = {
        cod,name
    };
    console.log("<newProv>");
    console.log(newProv);
    console.log("<newProv>");
    await pool.query('update proveedor set ? where cod = ?',[newProv,cod]);
    
    req.flash('success','proveedor guardado');
    res.redirect('/proveedores');

});

router.get('/',async(req,res)=>{ 
    //const {cod} =req.params ;
    const proveedores = await pool.query('SELECT * from db_partent.proveedor'); 
    console.log(proveedores);
    res.render('proveedores/list',{proveedores}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :cod porque de por si uso edit.hbs y no necesita el cod que recbe en la info del link\ 

});
module.exports = router;
