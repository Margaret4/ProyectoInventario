const express = require('express');
const router = express.Router();
const pool=require('../database'); 

router.get('/add',(req,res)=>{
    const articulos =  pool.query('SELECT * FROM db_partent.articulo'); 
    console.log(articulos);

    res.render('parteEntrada/add',{articulos});
    
});
//render == incrusta
router.post('/add',async(req,res)=>{
    console.log('aaah >:v');
    const {name,codigo,uni,canti}= req.body;
    var cod = parseInt(codigo)
    var cant = parseInt(canti)
    const newProv = {
        cod,name,uni,cant
        
    };

    console.log(newProv);  //aaaqui >:v7

    await pool.query('INSERT INTO db_partent.articulo set  ?',[newProv]); //es como decirle que se espere a que responda pra continuar

    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success','link saved successfully ');
    res.redirect('/articulos');// "el redirect funciona como un return no se lee lo que le sigue" by coren
    
});

router.get('/delete/:id',async(req,res)=>{
    const {id} =req.params ;
    await pool.query('DELETE FROM db_partent.articulo WHERE ID =?',[id]);
    req.flash('success','link deleted successfully ');
    res.redirect('/articulos');


});
router.get('/edit/:id',async(req,res)=>{ //se muestra en el link 
    const {id} =req.params ;
    const articulos = await pool.query('SELECT * FROM articulo WHERE id=?',[id]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un id 
    
    res.render('articulos/edit',{articulo:articulos[0]}); 
    console.log(articulo)

});
router.post('/edit/:id',async(req,res)=>{ //pasan encriptados
    const {name,codigo,canti,uni}= req.body;
    const {id} =req.params ;
    /*console.log("<req.body>");
    console.log(req.body);
    console.log("<req.body>");
    console.log("<req.params>");
    console.log(req.params);
    console.log("</req.params>");*/
    var cod = parseInt(codigo);
    var cant = parseInt(codigo);
    const newProv = {
        cod,name, cant,uni
    };
    console.log("<newProv>");
    console.log(newProv);
    console.log("<newProv>");
    await pool.query('update articulo set ? where id = ?',[newProv,id]);
    
    req.flash('success','articulo guardado');
    res.redirect('/articulos');

});

router.get('/',async(req,res)=>{ 
    //const {id} =req.params ;
    const articulos = await pool.query('SELECT * FROM db_partent.partent'); 
    console.log(articulos);
    res.render('articulos/list',{articulos}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :id porque de por si uso edit.hbs y no necesita el id que recbe en la info del link\ 

});
module.exports = router;
